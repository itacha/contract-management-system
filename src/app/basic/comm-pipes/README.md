### 制作和管理一些公共的**Pipe**

#### 编写Pipe
```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sexIdentify'     // Pipe在使用时的标识
})
export class SexIdentifyPipe implements PipeTransform {
    /**
     * 判断性别
     */
    transform(value: string | number | boolean): string {
        // TODO:
        处理方法，直接显示返回要显示的值
    }
}
```

#### 导出声明
```
@NgModule({
  imports: [
    CommonModule    
  ],
  providers: [
    ...SPECIALSERVICE
  ],
  declarations: [
    ...COMMCOMPONENT,
  ],
  exports: [
    ...COMMCOMPONENT,
  ],
})
export class BasicModule { }

```

#### 使用Pipe
```
{{ value | sexIdentify }}
```