/**
 * Log输出颜色配置等
 */
export interface LogServiceParmas {
    msg?: string;   // 文字描述
    color?: string; // 文字描述颜色
    obj?: any;  // Log输出内容
}

/**
 * 数据流的基本信息
 */
export interface DataFlowObj {
    uniqueKey: string | number; // 数据流的关键标识信息
    data: any;  // 数据流里的数据内容
}

// 用户登录时传递的基本信息
export interface UserLoginParmas {
    loginName: string | number;
    passWord: string | number;
    appType: 'web_login' | string | number;
    appId: string | number;
    appSecret: string | number;
}

// 用户的基本信息
export interface UserInfo {
    name?: string;
    email?: string;
    avatar?: string;
    [key: string]: any;
}

// ng-alain存储的用户基本信息结构
export interface UserInfoAndToken {
    token?: string;
    user?: UserInfo;
}


/**
 * -----------------作屏幕锁定时的用户身份验证----------------------
 */
// 验证用户密码时传递的信息（ng-alain的HTTP拦截器会携带Token到服务器，根据Token判定用户ID）
export interface VerifyUserPassWordParmas {
    passWord: string | number;
}

// 用户密码是否正确
export interface IsPassWordWright {
    isPassWdRight: boolean;
}
