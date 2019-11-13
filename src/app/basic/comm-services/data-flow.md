## 数据流 `DataFlow` 使用说明

### 数据发送方
```
// 引入数据发送服务
import { DataFlowService, DataFlowObj } from 'app/basic';
// 初始化
constructor(
    private dataflow: DataFlowService,
  ) { }

// 发送数据
/**
 * @Parmas: key  [发送数据的唯一标识]
 * @Parmas: res  [需要发送的数据源]
 */
sendCustomerKeyInfoToTab(key, res): void {
    this.dataflow.sendDataFlow(key, res);
}

```

### 数据接收方
```
// 引入主要需求数据
import { Subscription } from 'rxjs';
import { DataFlowService, DataFlowObj } from 'app/basic';

// 初始化
constructor(
    public dataflow: DataFlowService,
) { }

subscription: Subscription; // 定义数据流的订阅


// 启动时注册订阅事件 在ngOnInit()中执行
registerSubscription(): void {
    this.subscription = this.dataflow.DataFlow$.subscribe(
        (message: DataFlowObj) => {
            // 根据数据流的结果执行特定方法
            ...
        }
    );
}
// 结束时取消事件订阅
ngOnDestroy() {
    this.subscription.unsubscribe();
}
```