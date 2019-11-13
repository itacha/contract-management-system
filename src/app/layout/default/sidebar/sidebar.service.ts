import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import { PasswordDetail } from './interface';

@Injectable()
export class SidebarService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }
  
 
  //修改密码
  updatePassword(param:PasswordDetail){
    return this.client.post(this.apiUrl.Sysuser.updatePassWord,param).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(
          ev,
          {msg:'修改密码',color:'grey'},
          true,
          false
        );
      })
    );
  }
  
}
