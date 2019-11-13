import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UserLockComponent } from 'app/routes';
import { CommDataService } from '../comm-datas';
import { ShowLogService } from '../comm-services';
import { Observable } from 'rxjs';

/**
 * 屏幕解锁验证守卫
 */
@Injectable()
export class CanUnlockLeaveProvide implements CanDeactivate<UserLockComponent> {
    constructor (
        public msg: NzMessageService, 
        private CommData: CommDataService,
        public log: ShowLogService,
    ) {}

    canDeactivate(
        component: UserLockComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return new Observable((observer) => {
            this.log.logMsg('企图离开锁屏页面，正在验证解锁权限...', 'blue');
            const falg = this.CommData.isLockCcreen;
            if (falg) {
                this.msg.info('请输入正确登录密码，解锁屏幕...', { nzDuration: 2500 }); 
                observer.next(false);                              
                observer.complete();
            } else {
                observer.next(true);
                this.log.logMsg('屏幕解锁验证成功！！！', 'green');
                observer.complete();
            }
        });
    }
}
