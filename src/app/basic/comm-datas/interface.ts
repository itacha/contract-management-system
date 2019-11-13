// API接口返回数据格式
export interface ApiResponse {
  msg?: any; // 接口返回提示信息
  code?: string | number;
  request_url?: string;
  data?: any;
  count?: any;
}

export interface ApiResToComponent {
  isComplete: boolean;
  items?: any;
  needLogin?: any;
  count?: any;
}

// 返回成功的结果
export class SuccessApiRequest {
  constructor(obj: any, count?: any) {
    this.apireturn = {
      items: obj,
      isComplete: true,
      count: count ? count : null,
    };
  }
  public apireturn: ApiResToComponent;
}
// 返回失败的结果
export class ErrorApiRequest {
  constructor() {
    this.apireturn = {
      isComplete: false,
    };
  }
  public apireturn: ApiResToComponent;
}
