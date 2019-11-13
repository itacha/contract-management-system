import { OnInit, Component, Input } from '@angular/core';
import { SFSchema } from '@delon/form';
import { BaseOfSimpleForm } from 'app/pages/comm';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { UsbkeyNewService } from './usbkey-new.service';
import { ApiResToComponent } from 'app/basic';
import { usbKey } from './usbKey-interface';
import { Observable } from 'rxjs';
const RockeyOne = require('../../../js/rockey1_api.js');
const RockeyThree = require('../../../js/rockey3_api.js');
@Component({
    selector: 'app-verify',
    template: `
    <sf #lisence [schema]="schema"  button="none">
        <div class="modal-footer">
            <button nz-button type="button" (click)="lisence.reset()">重置</button>
            <button nz-button type="submit" [nzType]="'primary'" (click)="submit(lisence.value)" [disabled]="!lisence.valid"
            [nzLoading]="loading">提交</button>
        </div>
    </sf>
    `
    // <sf [schema]="schema" (formSubmit)="submit($event)"></sf>
})
export class VerifyComponent extends BaseOfSimpleForm {

    makeParmas(value: any) {
        throw new Error('Method not implemented.');
    }
    sendToServer(value: any): Observable<any> {
        throw new Error('Method not implemented.');
    }

    @Input()
    params: usbKey;


    constructor(public NzModal: NzModalRef, public UsbSer: UsbkeyNewService, public msg: NzMessageService) {
        super(NzModal);
    }

    schema: SFSchema = {
        properties: {
            vendorIdKey: {
                type: 'string',
                title: 'PID',
                // minLength:6,
                // maxLength: 18,

                ui: {
                    type: 'password',
                    grid: {
                        span: 24
                    }
                }
            },
            soPingKey: {
                type: 'string',
                title: '开发商口令',
                // minLength:6,
                // maxLength: 18,
                ui: {
                    type: 'password',
                    grid: {
                        span: 24
                    }
                }
            }
        },
        required: ['vendorIdKey', 'soPingKey'],
        ui: {
            grid: {
                span: 24
            }
        }
    };

    submit(value: any) {
        Object.assign(this.params, value);
        Object.assign(this.params,{soPin:this.params.soPingKey})
        this.UsbSer.checkPidAnSoPin(this.params).subscribe((res: ApiResToComponent) => {
            if (res) {
                if (res.isComplete) {
                    const contractId = this.params.contractId;
                    Object.assign(this.params,res.items)
                    this.params.contractId=contractId;
                    this.auth(this.params);
                }
            }
        });

    }

    auth(params) {
        //生成签名
        this.UsbSer.getSign(params).subscribe((res: ApiResToComponent) => {
            if (res) {
                if (res.isComplete) {
                    //写入签名
                    Object.assign(this.params, { signContent: this.params.sign });
                    Object.assign(this.params, { sign: res.items.sign,publicKey:res.items.publicKey });
                    let msg;
                    if(this.params.usbkeyType === 'rockey1'){
                        msg = RockeyOne.setAuth(this.params.vendorId, this.params.userPin,this.params.soPin, this.params.sign);
                    }else{
                        msg = RockeyThree.setAuthCode(this.params.vendorId,this.params.soPin, this.params.sign);
                    }
                     if (msg.status == 0) {
                         this.saveUkey(this.params);
                     } else {
                         this.msg.error(msg.msg);
                     }
                }
            }
        });
    }

    saveUkey(params) {
        //保存数据到数据库更新状态等操作 (签名信息，公钥信息、合同编号、修改对应ukey状态，添加授权列表信息等)
        this.UsbSer.saveUkey(params).subscribe((res: ApiResToComponent) => {
            if(res){
                if (res.isComplete) {
                    // close window
                    this.NzModal.destroy(true);
                }
            }
        });
    }
}