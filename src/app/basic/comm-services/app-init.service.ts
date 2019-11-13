import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService, TitleService } from '@delon/theme';
import { CommDataService } from '../comm-datas/public_api';
import { ShowLogService } from './show-log.service';

@Injectable()
export class AppInitService {
    // 允许直接访问
    direct: any = { _allow_anonymous: true };
    constructor(
        private httpClient: HttpClient,
        public titleService: TitleService,
        public settingService: SettingsService,
        public log: ShowLogService,
        private CommData: CommDataService,
      ) { }
    /**
     * 获取APP的初始化信息，不包含用户信息，菜单，权限等
     */
    appInit(): Promise<any> {
        if (this.CommData.isNeedInitApp) {
          return new Promise((resolve, reject) => {
            this.CommData.isNeedInitApp = false;
            this.httpClient
              .get('assets/tmp/app-info.json')
              .subscribe(
                (appInfo) => {
                  this.log.logObj(appInfo, 'APP简单初始化信息', 'green');
                  // application data
                  const _appInfo: any = appInfo;
                  // 应用信息：包括站点名、描述、年份
                  this.settingService.setApp(_appInfo.app);
                  // 设置页面标题的后缀
                  this.titleService.suffix = _appInfo.app.name;
                },
                () => { },
                () => {
                  resolve(null);
                },
              );
            resolve(null);
          });
        }
      }
}
