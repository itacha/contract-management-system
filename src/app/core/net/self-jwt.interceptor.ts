import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { DelonAuthConfig, DA_SERVICE_TOKEN, JWTTokenModel } from '@delon/auth';
import { environment } from '@env/environment';
import { SelfBaseInterceptor } from '@core/net/self-base.interceptor';

@Injectable()
export class SelfJWTInterceptor extends SelfBaseInterceptor {
  isAuth(options: DelonAuthConfig): boolean {
    try {
      this.model = this.injector
        .get(DA_SERVICE_TOKEN)
        .get<JWTTokenModel>(JWTTokenModel);
      if (environment.debug) {
        console.log(
          `%c JWT_START: JWT验证开始`,
          `background:green;color:#fff`,
          this.model.time,
        );
      }
      return (
        this.model &&
        this.model.token &&
        !this.model.isExpired(options.token_exp_offset)
      );
    } catch (event) {
      if (environment.debug) {
        console.log(
          `%c JWT_ERROR: JWT验证失败`,
          `background:red;color:#fff`,
          this.model.time,
        );
      }
      return false;
    }
  }

  setReq(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `${this.model.token}`,
      },
    });
  }
}
