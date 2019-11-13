import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';


@Injectable()
export class UsbkeyListService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  getList(params) {
    return this.client.get(this.apiUrl.usbKey.list,params).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(ev,{msg:'获取授权列表信息',color:'green'},true,false)
      })
    )
  }

  // 文件下载
  downloadLisence(params) {
    return this.client.post(this.apiUrl.usbKey.exportLisence,params).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(ev,{msg:'下载lisence',color:'green'},true,false)
      })
    );
  }

}
