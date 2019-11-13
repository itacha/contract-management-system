import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { ApiResToComponent, CommDataService } from '../comm-datas';
import { AppAuthService, AppInitService, ShowLogService } from '../comm-services';

/**
 * 用户登录的路由验证守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AppAuthService,
        public msg: NzMessageService,
        private CommData: CommDataService,
        private appInit: AppInitService,
        public log: ShowLogService,
        private router: Router,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        const url: string = state.url;
        this.CommData.redirectUrl = url;
        this.log.logMsg('开始验证权限...', 'blue');
        // 判断是否有Token
        const _token = this.tokenService.get();
        if (!_token.token) {
            this.log.logMsg('没有登录Token，权限验证失败...', 'red');
            // 获取登录地址
            const loginUrl = this.CommData.loginUrl();
            // 验证失败，返回登录界面
            this.appInit.appInit().then(
                () => this.router.navigate([loginUrl])
            );
            return false;
        }
        // 判断是否是锁屏状态
        const falg = this.CommData.isLockCcreen;
        if (falg) {
            this.log.logMsg('屏幕解锁验证失败！！！', 'red');
            this.msg.info('请输入正确登录密码，解锁屏幕...', { nzDuration: 2500 });
            this.router.navigate(['/passport/lock']);
            return false;
        }
        // 进行正常的权限验证
        return new Observable((observer) => {
            this.auth.checkToken().subscribe(
                (response: ApiResToComponent) => {
                    if (!response.isComplete) observer.next(false);
                    if (response.isComplete && !response.needLogin) observer.next(true),
                        this.log.logMsg('成功通过验证权限！！！', 'green');
                    observer.complete();
                }
            );
        });
    }
}
