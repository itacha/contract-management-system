import { Component, Input } from '@angular/core';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { ProductDetial } from './interface';
@Component({
  selector: 'app-product-view',
  templateUrl: './view.component.html',
})
export class ProductViewComponent extends BaseOfSimpleForm {
  makeParmas(value: any) {
    throw new Error("Method not implemented.");
  }
  sendToServer(value: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
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
      name: {
        type: 'string',
        title: '产品名称',
        readOnly:true,
        ui: {
          placeholder: '请输入产品名称',
          grid: {
            span: 12,
          },
        },
        maxLength: 64,
      },
      versoin: {
        type: 'string',
        title: '版本号',
        readOnly:true,
        ui: {
          placeholder: '请输入版本号',
          grid: {
            span: 12,
          },
        },
        maxLength: 64,
      },
      json: {
        type: 'string',
        title: '产品功能',
        readOnly:true,
        ui: {
          placeholder: '请输入产品功能',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 10 },
          // size: 'def',
        },
        maxLength: 4000,
      },
      remark: {
        type: 'string',
        title: '备注信息',
        readOnly:true,
        ui: {
          placeholder: '请输入产品备注信息',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 400,
      },
    },
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };
}
