import { OnInit, Component, Input, ViewChild } from '@angular/core';
import { SFSchema, SFComponent } from '@delon/form';
import { BaseOfSimpleForm } from 'app/pages/comm';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { UsbkeyGenListService } from './usbkey-gen-list.service';
import { ApiResToComponent } from 'app/basic';
import { usbKey } from '../usbkey-new/usbKey-interface';
import { Observable } from 'rxjs';
import { UsbkeyNewService } from '../usbkey-new/usbkey-new.service';
const RockeyOne = require('../../../js/rockey1_api.js');
const RockeyThree = require('../../../js/rockey3_api.js');

@Component({
  selector: 'app-gen-do',
  template: `
    <sf #lisence [schema]="schema" [formData]="params" button="none">
      <div class="modal-footer">
        <button nz-button type="button" (click)="newReset()">重置</button>
        <button
          nz-button
          type="submit"
          [nzType]="'primary'"
          (click)="submit(lisence.value)"
          [disabled]="!lisence.valid"
          [nzLoading]="loading"
        >
          提交
        </button>
      </div>
    </sf>
  `,
  // <sf [schema]="schema" (formSubmit)="submit($event)"></sf>
})
export class AuthComponent extends BaseOfSimpleForm {
  makeParmas(value: any) {
    throw new Error('Method not implemented.');
  }
  sendToServer(value: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  @Input()
  params: usbKey;
  resetParams: any;

  constructor(
    public NzModal: NzModalRef,
    public UsbSer: UsbkeyGenListService,
    public UsbNewSer: UsbkeyNewService,
    public msg: NzMessageService,
  ) {
    super(NzModal);
  }

  ngOnInit() {
    console.log(this.params);
    if (this.params.periodType === '1') {
      Object.assign(this.params, {
        authTime:
          this.dateFtt('yyyy-MM-dd', new Date(this.params.startTime)) +
          '--' +
          this.dateFtt('yyyy-MM-dd', new Date(this.params.endTime)),
      });
    } else {
      Object.assign(this.params, { authTime: '永久' });
    }
    this.resetParams = this.params;
  }
  @ViewChild('lisence') sf: SFComponent;

  schema: SFSchema = {
    properties: {
      //    contractProduct: {
      //         type: 'string',
      //         title: '产品名称',
      //         // minLength:6,
      //         // maxLength: 18,
      //         readOnly: true,
      //         ui: {
      //             grid: {
      //                 span: 24
      //             }
      //         }
      //     },
      productFunctions: {
        type: 'string',
        title: '授权信息',
        // minLength:6,
        // maxLength: 18,
        readOnly: true,
        ui: {
          grid: {
            span: 24,
          },
        },
      },
      authTime: {
        type: 'string',
        title: '授权期限',
        // minLength:6,
        // maxLength: 18,
        readOnly: true,
        ui: {
          grid: {
            span: 24,
          },
        },
      },
      usbkeyType: {
        type: 'string',
        title: 'UsbKey类型',
        // minLength:6,
        // maxLength: 18,
        enum: [
          { label: 'Rockey1', value: '1' },
          { label: 'Rockey3', value: '3' },
        ],
        ui: {
          widget: 'select',
          placeholder: '选择Rockey类型',
          grid: {
            span: 24,
          },
        },
      },
      vendorIdKey: {
        type: 'string',
        title: '口令1',
        // minLength:6,
        // maxLength: 18,

        ui: {
          type: 'password',
          placeholder: '请输入加密狗PID口令',
          grid: {
            span: 24,
          },
        },
      },
      soPingKey: {
        type: 'string',
        title: '口令2',
        // minLength:6,
        // maxLength: 18,
        ui: {
          type: 'password',
          placeholder: '请输入加密狗开发商口令',
          grid: {
            span: 24,
          },
        },
      },
    },
    required: ['usbkeyType', 'vendorIdKey', 'soPingKey'],
    ui: {
      grid: {
        span: 24,
      },
    },
  };

  //重置方法
  newReset() {
    this.params.soPingKey = '';
    this.params.vendorIdKey = '';
    this.params.usbkeyType = '';
    Object.assign(this.sf.formData, this.params);
    this.sf.refreshSchema();
  }

  dateFtt(fmt, date) {
    //author: meizz
    var o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length),
        );
    return fmt;
  }

  submit(value: any) {
    console.log(this.params);
    Object.assign(this.params, value);
    Object.assign(this.params, { soPin: this.params.soPingKey });
    try {
      let checkResult = this.checkPidAnSoPin(this.params);
      console.log(checkResult);
      if (checkResult.status === '1') {
        this.msg.error('口令1或者口令2错误，请确认后再试！');
      } else {
        Object.assign(this.params, { usbkeyId: checkResult.msg });
        this.UsbSer.checkPidAnSoPin(this.params).subscribe(
          (res: ApiResToComponent) => {
            if (res) {
              if (res.isComplete) {
                Object.assign(this.params, {
                  privateNumber: this.params.usbkeyType,
                });
                Object.assign(this.params, {
                  signContent: this.params.productFunctions,
                });
                Object.assign(this.params, {
                  privateLicense: this.params.authTime,
                });
                Object.assign(this.params, {
                  publicKey: this.params.vendorIdKey,
                });
                this.UsbNewSer.saveUkey(this.params).subscribe(
                  (res: ApiResToComponent) => {
                    if (res) {
                      if (res.isComplete) {
                        // close window
                        this.NzModal.destroy(true);
                      }
                    }
                  },
                );
              }
            }
          },
        );
      }
    } catch (error) {
      console.log(error);
      this.msg.error('请确认是否已安装uKey插件，或联系系统管理员！');
    }
  }

  checkPidAnSoPin(params) {
    if (params.usbkeyType === '1') {
      return RockeyOne.verifySoPin(params.vendorIdKey, params.soPingKey);
    } else {
      return RockeyThree.verifySoPin(params.vendorIdKey, params.soPingKey);
    }
  }
}
