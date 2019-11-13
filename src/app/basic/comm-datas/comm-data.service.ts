import { Injectable, Injector } from '@angular/core';
import { DelonAuthConfig } from '@delon/auth';

@Injectable()
export class CommDataService {
    // 初始化
    constructor(
        protected injector: Injector,
        public Config: DelonAuthConfig,
    ) {
    }
    // 是否锁定屏幕
    public isLockCcreen = false;

    // 是否需要加载APP初始化信息
    public isNeedInitApp = true;

    // 获取登录连接地址
    public loginUrl(): string {
        const options = Object.assign(
            new DelonAuthConfig(),
            this.injector.get(DelonAuthConfig, null),
        );
        return options.login_url;
    }

    // 是否已经登录
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl = '/';

    //rockey 初始化可配数据
    initPid1 = '6945B96D';
    
    initPid3 = '91927D60';

}
