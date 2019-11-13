import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { ApiResToComponent, ShowModalService, CommDataService } from 'app/basic';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { Observable, of } from 'rxjs';
import { LicenseService } from '../license.service';
import { UsbkeyNewService } from './usbkey-new.service';
import { AnimateTimings } from '@angular/animations';
import { VerifyComponent } from './Verify.component';
const RockeyOne = require('../../../js/rockey1_api.js');
const RockeyThree = require('../../../js/rockey3_api.js');

@Component({
    selector: 'app-license-usbkey-new-page',
    templateUrl: './usbkey-new.component.html',
    styleUrls: ['./usbkey-new.component.less'],
})
export class UsbkeyNewPageComponent implements OnInit {

    @Input()
    title = '生成授权码';
    head_content = '生成授权码页面。';
    datas: any = {
        sign: '',
    };
    flag: number;
    schema: SFSchema = {
        properties: {
            contractId: {
                type: 'string',
                title: '关联合同',
                ui: {
                    grid: {
                        span: 24,
                    },
                    widget: 'select',
                    asyncData: () => this.findContractList(),
                    change: (ngModel: any) => {
                        this.findContractItem(ngModel);
                    },
                },
            },
            sign: {
                type: 'string',
                title: '授权信息',
                ui: {
                    grid: {
                        span: 24,
                    }
                }
            },
        },

        required: ['contractId', 'sign'],
        ui: {
            spanLabelFixed: 100,
            grid: { span: 24, }
        }
    };
    params: any = {};

    constructor(
        public licenseSer: LicenseService,
        public listSer: UsbkeyNewService,
        public model: ShowModalService,
        public commonData:CommDataService,
    ) { }

    // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
    _onReuseInit() {
        // this.ngOnInit();
    }

    // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
    _onReuseDestroy() { }


    ngOnInit() {
        const Pid = this.commonData.initPid1;
        const Pid3 = this.commonData.initPid3;
        this.flag = RockeyOne.find(Pid);
        let flag3 = RockeyThree.find(Pid3);

        if(this.flag >= 1 && flag3 >=1){
            this.flag = 0;
            return;
        }

        if (this.flag >= 1) {
            let params;
            params = { usbkeyNumber: RockeyOne.getHid(Pid).msg ,vendorId:Pid,usbkeyType:'rockey1'};
            Object.assign(this.params, params);
        }else{
            this.flag = flag3;
            let params;
            params = { usbkeyNumber: RockeyThree.r3GetHardID(Pid3).msg ,vendorId:Pid3,usbkeyType:'rockey3'};
            Object.assign(this.params, params);
        }
    }

    getCustomsList() {

    }

    findContractList() {
        return this.listSer.findContractList();
    }

    findContractItem(contractId) {
        this.listSer.findContractItem(contractId).subscribe((res: ApiResToComponent) => {
            if (res) {
                this.datas = { sign: this.getIteams(res.items.contractSnapshots), contractId: contractId };
                Object.assign(this.datas, this.params);

            }
        });
    }
    getIteams(v: any) {
        let iteams = '';
        if (v.length > 0) {
            v.forEach(element => {
                iteams += element.contractDesc + ':' + element.contractSnapshotCont + ';';
            });
        }
        return iteams;
    }

    submit(e) {
        this.model.creatStaticModal(VerifyComponent, { params: this.datas }, 'md', {
            nzTitle: '开发商口令'
        }).subscribe((res) => {
            if (res) {
                //弹框数据提交完毕之后关闭弹框，此页面的后续操作
                
            }
        });

    }
    //重置页面
    reSetDataGet(params) {
        this.datas = {};
    }

}
