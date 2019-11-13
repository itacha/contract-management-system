import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppInitService } from './app-init.service';
import { UserLoginParmas, VerifyUserPassWordParmas } from './interface';
import {
  ApiResToComponent,
  ApiResponse,
  ErrorApiRequest,
  SuccessApiRequest,
  ApiUrlDataService,
  CommDataService,
} from '../comm-datas';
import { CommBasicService } from './basic.service';

@Injectable()
export class AppAuthService extends CommBasicService {
  // 直接访问
  direct: any = { _allow_anonymous: true };

  constructor(
    public injector: Injector,
    private router: Router,
    public CommData: CommDataService,
    private appInit: AppInitService,
  ) {
    super(injector);
  }

  // 登录用户
  login(body: UserLoginParmas): Observable<ApiResToComponent> {
    return this.client.post(this.apiUrl.auth.login, body, this.direct).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(ev, {
          msg: 'APP登录用户信息',
          color: 'green',
        });
      }),
    );
  }

  // 检查用户是否登录，验证token
  checkToken(): Observable<ApiResToComponent> {
    return this.client.post(this.apiUrl.auth.checktoken).pipe(
      map((ev: ApiResponse) => {
        this.log.logObj(ev, '验证用户Token密码是否正确', 'red');
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          // 获取登录地址
          const loginUrl = this.CommData.loginUrl();
          // 验证失败，返回登录界面
          this.appInit.appInit().then(() => this.router.navigate([loginUrl]));
          return new ErrorApiRequest().apireturn;
        } else {
          return new SuccessApiRequest(ev.data).apireturn;
        }
      }),
    );
  }

  // 验证用户密码是否正确，用于开启锁屏界面
  verifyUserPassWord(
    body: VerifyUserPassWordParmas,
  ): Observable<ApiResToComponent> {
    return this.client.put(this.apiUrl.auth.verifypassword, body).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(ev, {
          msg: '验证用户密码是否正确',
          color: 'red',
        });
      }),
    );
  }
}
