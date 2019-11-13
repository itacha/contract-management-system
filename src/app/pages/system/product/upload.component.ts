import { Component, Input } from '@angular/core';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { ProductDetial } from './interface';
@Component({
  selector: 'app-product-upload',
  templateUrl: './upload.component.html',
})
export class ProductUploadComponent extends BaseOfSimpleForm {
  @Input()
  item: any = {};
  @Input()
  asyncData: () => Observable<SFSchemaEnumType[]>;
  constructor(public NzModal: NzModalRef, private ProductSer: ProductService) {
    super(NzModal);
  }

  // 表单编辑数据结构
  schema: SFSchema = {
    properties: {
      json: {
        type: 'string',
        title: '产品功能',
        ui: {
          placeholder: '请输入产品功能',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 64,
      },
    },
    required: ['name', 'versoin'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };

  // 处理提交的参数
  makeParmas(value: ProductDetial) {
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: ProductDetial): Observable<any> {
    console.log(value);
    if (value.id == null || value.id === '') {
      return this.ProductSer.saveProduct(value);
    }
    return this.ProductSer.updateProduct(value);
  }
}
