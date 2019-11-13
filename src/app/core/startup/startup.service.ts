import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
    MenuService,
    SettingsService,
    TitleService,
} from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ApiUrlDataService } from 'app/basic';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
        private urlApi: ApiUrlDataService
    ) { }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve) => {
            zip(
                this.httpClient.post(this.urlApi.Sysmenu.findUserAllMenuList, ''),  // 获取菜单数据
                this.httpClient.get('assets/tmp/app-info.json') // 获取APP基础信息
            )
                .pipe(
                    // 接收其他拦截器后产生的异常消息
                    catchError(([appData, appInfo]) => {
                        resolve(null);
                        return [appData, appInfo];
                    }),
                )
                .subscribe(
                    ([appData, appInfo]) => {
                        console.log(appData);
                        if (appData.code !== 401) {
                            // application data
                            const res: any = appData.data;
                            // 用户信息：包括姓名、头像、邮箱地址
                            const user = {
                                name: res.user.userName
                            };
                            this.settingService.setUser(user);
                            // ACL：设置权限为全量
                            this.aclService.setFull(true);
                            // 初始化菜单
                            console.log(res.menu);

                            this.menuService.add(res.menu);

                            const _appInfo = appInfo;
                            // 应用信息：包括站点名、描述、年份
                            this.settingService.setApp(_appInfo.app);
                            // 设置页面标题的后缀
                            this.titleService.suffix = _appInfo.app.name;
                        }
                    },
                    () => { },
                    () => {
                        resolve(null);
                    },
                );
        });
    }
}
