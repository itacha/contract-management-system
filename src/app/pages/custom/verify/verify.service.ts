import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';


@Injectable()
export class VerifyService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

 //获取客户列表
 getVerifyCustomerList(param) {
  return this.client.get(this.apiUrl.BusCustomer.getVerifyCustomerList,param).pipe(
    map((ev: ApiResponse) => {
      return this.doWithResponse(
        ev,
        { msg: '获取待审核客户信息列表', color: 'grey' },
        true,
      );
    }),
  );
}
//审核客户信息
verifyCustomer(param){
  return this.client.post(this.apiUrl.BusCustomer.verifyCustomer,param).pipe(
    map((ev: ApiResponse) => {
      return this.doWithResponse(
        ev,
        { msg: '审核客户信息', color: 'grey' },
        true,
        true
      );
    }),
  );
}
 
}
