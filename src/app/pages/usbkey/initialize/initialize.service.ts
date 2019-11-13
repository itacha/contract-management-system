import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';


@Injectable()
export class InitializeService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }
  saveUkey(params) {
    return this.client.post(this.apiUrl.usbKey.addUsbkey, params).pipe(
      map((ev: ApiResponse) => {
        if (ev) {
          return this.doWithResponse(ev,
            {
              msg: '获取usbKey列表',
              color: 'green',
            },
            true, true);
        }
      })
    );

  }

}
