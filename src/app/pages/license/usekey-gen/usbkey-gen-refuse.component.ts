import { OnInit, Component, Input } from '@angular/core';
import { SFSchema } from '@delon/form';
import { BaseOfSimpleForm } from 'app/pages/comm';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { UsbkeyGenListService } from './usbkey-gen-list.service';
import { ApiResToComponent } from 'app/basic';
import { usbKey } from '../usbkey-new/usbKey-interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-gen-refuse',
    template: `
    <sf #lisence [schema]="schema" [formData] = "params" button="none">
        <div class="modal-footer">
            <button nz-button type="button" (click)="lisence.reset()">重置</button>
            <button nz-button type="submit" [nzType]="'primary'" (click)="submit(lisence.value)" [disabled]="!lisence.valid"
            [nzLoading]="loading">提交</button>
        </div>
    </sf>
    `
    // <sf [schema]="schema" (formSubmit)="submit($event)"></sf>
})
export class RefuseComponent extends BaseOfSimpleForm {

    makeParmas(value: any) {
        throw new Error('Method not implemented.');
    }
    sendToServer(value: any): Observable<any> {
        throw new Error('Method not implemented.');
    }

    @Input()
    params: usbKey;

    constructor(public NzModal: NzModalRef, public UsbSer: UsbkeyGenListService, public msg: NzMessageService) {
        super(NzModal);
    }

    schema: SFSchema = {
        properties: {
            refuseReason: {
                type: 'string',
                title: '拒绝原因',
                // minLength:6,
                // maxLength: 18,
                ui: {
                    widget: 'textarea',
                    autosize: { minRows: 2, maxRows: 6 },
                    grid: {
                        span: 24
                    }
                }
            },
            contractId: {
                type: 'string',
                title: '合同Id',
                // minLength:6,
                // maxLength: 18,
                ui: {
                    hidden:true,
                    grid: {
                        span: 24
                    }
                }
            },
        },
        required: ['refuseReason'],
        ui: {
            grid: {
                span: 24
            }
        }
    };

    submit(value: any) {
        Object.assign(this.params, value);
        let param = {refuseReason: this.params.refuseReason,contractId:this.params.contractId}
        //Object.assign(this.params,{soPin:this.params.soPingKey});
        this.refuseLicense(param);
    }

    refuseLicense(params){
        this.UsbSer.refuseLisence(params).subscribe((res: ApiResToComponent) => {
            if (res){
                console.log(res)
                if (res.isComplete) {
                    // close window
                    this.NzModal.destroy(true);
                }
            }
          });
    }
}