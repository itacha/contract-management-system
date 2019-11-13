import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable()
export class ListService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  getUsbKeyList(param) {
    return this.client.get(this.apiUrl.usbKey.gatAllUsbKeyList,param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          {
            msg: '获取usbKey列表',
            color: 'green',
          },
          true,
        );
      }),
    );
  }
}
