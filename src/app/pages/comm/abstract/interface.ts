// 表单返回的数据格式要求
export interface STList {
  isComplete: boolean; // 状态标识
  items: any;
  count: number | string;
}

export interface ScrollParmas {
    x?: string;
    y?: string;
}
