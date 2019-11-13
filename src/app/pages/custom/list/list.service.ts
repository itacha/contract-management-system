import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import { CustomerDetial } from './interface';

@Injectable()
export class ListService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  //获取客户列表
  getCustomsList(param) {
    //console.log(this.apiUrl.BusCustomer.getAllCusotmerList);
    return this.client.get(this.apiUrl.BusCustomer.getAllCustomerList,param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取客户信息列表', color: 'grey' },
          true,
        );
      }),
    );
  }
  
  //新增客户信息
   addCustomer(param:CustomerDetial){
    return this.client.post(this.apiUrl.BusCustomer.saveCustomer,param).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(
          ev,
          {msg:'新增客户信息',color:'grey'},
          true,
          true
        );
      })
    );
  }
  //修改客户信息
  updateCustomer(param:CustomerDetial){
    return this.client.post(this.apiUrl.BusCustomer.updateCustomer,param).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(
          ev,
          {msg:'修改客户信息',color:'grey'},
          true,
          true
        );
      })
    );
  }
  //删除客户信息
  deleteCustomer(param:CustomerDetial){
    return this.client.post(this.apiUrl.BusCustomer.deleteCustomer,param ).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '删除客户信息', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
}
