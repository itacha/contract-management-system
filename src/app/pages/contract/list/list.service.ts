import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import {
  ContractDetial,
  ContractInfoDetial,
  ContractSnapDetial,
  ContractLinkDetail,
  ContractAttachmentDetail,
} from './interface';
import { Observable } from 'rxjs';
import { SFSchemaEnumType } from '@delon/form';
import { UploadFile } from 'ng-zorro-antd';

@Injectable()
export class ListService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 获取合同列表
  getContractList(param) {
    return this.client.get(this.apiUrl.BusContract.getContractList+"?type=list", param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取合同列表', color: 'grey' },
          true,
        );
      }),
    );
  }
  //获取合同关联产品信息
  getContractProduct(param) {
    return this.client
      .get(this.apiUrl.BusContract.getContractProduct, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '获取合同关联产品信息', color: 'grey' },
            true,
          );
        }),
      );
  }

  // 新增客户信息
  addContract(param: ContractDetial) {
    return this.client.post(this.apiUrl.BusContract.addContract, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '新增合同信息', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
  // 修改客户信息
  updateContract(param: ContractDetial) {
    return this.client.post(this.apiUrl.BusContract.updateContract, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '修改合同信息', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
  // 删除客户信息
  deleteContract(param: ContractDetial) {
    return this.client.post(this.apiUrl.BusContract.deleteContract, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '删除合同信息', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
  // 申请生成ukey
  applyUsbkey(param: ContractDetial) {
    return this.client
      .post(this.apiUrl.BusContract.applyUsbkey, {
        contractId: param.contractId,
        applyStatus: param.applyStatus,
      })
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '申请生成ukey', color: 'grey' },
            true,
            true,
          );
        }),
      );
  }
  // 删除附件信息
  deleteContractAttachment(param: ContractAttachmentDetail) {
    return this.client
      .post(this.apiUrl.BusContract.deleteAttachementById, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '删除合同信息', color: 'grey' },
            true,
            false,
          );
        }),
      );
  }
  // 查看合同补充信息
  getContractInfoList(param) {
    return this.client.get(this.apiUrl.BusContract.getContractList, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取合同补充信息列表', color: 'grey' },
          true,
        );
      }),
    );
  }
  // 新增合同补充信息
  addContractInfoList(param: ContractDetial) {
    return this.client
      .post(this.apiUrl.BusContract.addContarctInfo, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '新增合同补充信息', color: 'grey' },
            true,
            true,
          );
        }),
      );
  }
  // 查看合同快照
  getContractSnapList(param) {
    return this.client.get(this.apiUrl.BusContract.getContractList, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取合同快照列表', color: 'grey' },
          true,
        );
      }),
    );
  }
  // 新增合同快照
  addContractSnap(param: ContractSnapDetial) {
    return this.client
      .post(this.apiUrl.BusContract.addContractSnap, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '新增合同快照信息', color: 'grey' },
            true,
            true,
          );
        }),
      );
  }
  // 上传附件
  uploadAttachment(param) {
    return this.client
      .post(this.apiUrl.BusContract.uploadAttachment, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '上传合同附件', color: 'grey' },
            true,
            true,
          );
        }),
      );
  }
  // 查看关联人员
  getContractLinkList(param) {
    return this.client.get(this.apiUrl.BusContract.getContractList, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取合同关联人员列表', color: 'grey' },
          true,
        );
      }),
    );
  }
  // 新增关联人员
  addContractLink(param: ContractLinkDetail) {
    return this.client.post(this.apiUrl.BusContract.addLink, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '新增合同关联人员信息', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
  // 获取客户下拉选
  findCustomerSelectList(param): Observable<SFSchemaEnumType[]> {
    return this.client
      .get(this.apiUrl.BusCustomer.getAllCustomerForContractList, param)
      .pipe(
        map((ev: ApiResponse) => {
          if (ev.code !== '10200') {
            this.msg.error(ev.msg);
            this.log.logObj(ev, '获取客户列表', 'grey');
            return;
          } else {
            const new_items = [];
            ev.data.forEach(element => {
              new_items.push({
                label: element.customerName,
                value: element.customerId,
              });
            });
            return new_items;
          }
        }),
      );
  }
  //获取产品下拉
  findProductList(param): Observable<SFSchemaEnumType[]> {
    return this.client.get(this.apiUrl.product.findAllProduct, param).pipe(
      map((ev: ApiResponse) => {
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取产品列表', 'grey');
          return;
        } else {
          const new_items = [];
          ev.data.forEach(element => {
            new_items.push({ label: element.name, value: element.id });
          });
          return new_items;
        }
      }),
    );
  }
  findProductList2(param): Observable<SFSchemaEnumType[]> {
    return this.client.get(this.apiUrl.product.findAllProduct, param).pipe(
      map((ev: ApiResponse) => {
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取产品列表', 'grey');
          return;
        } else {
          const new_items = [];
          ev.data.forEach(element => {
            new_items.push({ label: element.name, value: element.id });
          });
          // return new_items;
          return ev.data;
        }
      }),
    );
  }
  //获取产品功能
  findProductFunctionsList(param): Observable<SFSchemaEnumType[]> {
    return this.client.get(this.apiUrl.product.findById, param).pipe(
      map((ev: ApiResponse) => {
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取产品功能列表', 'grey');
          return;
        } else {
          // const new_items = [];
          // ev.data.forEach(element => {
          //   new_items.push({ label: element.name, value: element.id });
          // });
          // return new_items;
          return ev.data;
        }
      }),
    );
  }

  findProductFunctionsList2(param) {
    return this.client.get(this.apiUrl.product.findById, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取合同列表', color: 'grey' },
          true,
        );
      }),
    );
  }
  // 获取合同附件列表
  getContractAttachmentList(param): Observable<UploadFile[]> {
    return this.client
      .get(this.apiUrl.BusContract.getAttachmentAllList, param)
      .pipe(
        map((ev: ApiResponse) => {
          if (ev.code !== '10200') {
            this.msg.error(ev.msg);
            this.log.logObj(ev, '获取附件列表', 'grey');
            return;
          } else {
            const new_items = [];
            ev.data.forEach(element => {
              new_items.push({
                uid: element.uid,
                contractId: element.contractId,
                productId: element.productId,
                name: element.name,
                status: element.status,
                url: element.url,
                response: element.response,
              });
            });
            return new_items;
            // return ev.data
          }
        }),
      );
  }
  // 获取用户分组树
  findGroupTreeList(param): Observable<SFSchemaEnumType[]> {
    return this.client.get(this.apiUrl.SysUserGroup.findUserGroupSelect).pipe(
      map((ev: ApiResponse) => {
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取角色列表', 'grey');
          return;
        } else {
          return ev.data;
        }
      }),
    );
  }
}
