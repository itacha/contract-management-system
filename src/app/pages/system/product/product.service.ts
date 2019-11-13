import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import { ProductDetial } from './interface';

@Injectable()
export class ProductService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 获取产品列表
  getAllProductList() {
    return this.client.get(this.apiUrl.product.findAllProduct).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取日志列表', color: 'green' },
          true,
        );
      }),
    );
  }
  // 获取产品列表
  getProductList(v: ProductDetial) {
    return this.client.get(this.apiUrl.product.findAllProduct, v).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取日志列表', color: 'green' },
          true,
        );
      }),
    );
  }

  saveProduct(v: ProductDetial) {
    return this.client.post(this.apiUrl.product.saveProduct, v).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '新增产品', color: 'green' },
          true,
          true,
        );
      }),
    );
  }
  updateProduct(v: ProductDetial) {
    return this.client.post(this.apiUrl.product.editProduct, v).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '修改产品', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  delProduct(v: ProductDetial) {
    return this.client.post(this.apiUrl.product.delProduct, v).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '删除产品', color: 'green' },
          true,
          true,
        );
      }),
    );
  }
}
