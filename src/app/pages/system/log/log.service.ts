import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';


@Injectable()
export class LogsService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 获取角色列表
  getAllLogsList() {
    return this.client.get(this.apiUrl.SysLog.getAllLogsList).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取日志列表', color: 'green' },
          true,
        );
      }),
    );
  }

 
}
