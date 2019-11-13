import { Component, OnInit, Input,ElementRef } from '@angular/core';
import { SFSchema, SFUISchemaItem } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { InitializeService } from './initialize.service';
import { UsbKayIteam } from './initalize.interface';
import { ApiResToComponent } from 'app/basic';

const RockeyOne = require('../../../js/rockey1_api.js');
const RockeyThree = require('../../../js/rockey3_api.js');
@Component({
    selector: 'app-usbkey-initialize-page',
    templateUrl: './initialize.component.html',
    styleUrls: ['./initialize.component.less'],
})
export class InitializePageComponent implements OnInit {

    @Input()
    title = '初始化UsbKey';
    head_content = '初始化UsbKey并登记入系统。';
    initsoPin = '20F880ED1F81AE29';
    initvendorId = '6945B96D';
    initUserPin = '12345678';
    soPin = '1234567890';
    vendorId = '12345678';
    params: any = {};
    initvendorIdThree = '91927D60';
    initSoPinThree = '123456781234567812345678';
    schema: SFSchema = {
        properties: {
            usbkeyType: {
                type: 'string',
                title: '类型',
                enum: [{ label: 'Rockey1', value: 'rockey1' }, { label: 'Rockey3', value: 'rockey3' }],
                ui: {
                    widget: 'select',
                    placeholder: '选择Rockey类型',
                    change: (ngModel:any)=>{
                        //this.item = this.schema.properties.UkeyUPassword.ui;
                        //this.item
                        // = false;
                        this.onChange(ngModel);
                    },
                    optionalHelp: '选择Rockey类型',
                },
            }, usbkeyNumber: {
                type: 'string',
                title: 'UsbKey编号',
                minLength: 16,
                maxLength: 200,
                readOnly: true,
                ui: {
                    placeholder: '请获取UsbKey设备唯一编号',
                    optionalHelp: 'UsbKey设备唯一编号',
                }
            },
            // vendorId: {
            //     type: 'string',
            //     title: 'UsbKeyPID',
            //     minLength: 6,
            //     maxLength: 18,
            //     ui: {
            //         type: 'password',
            //         placeholder: 'UsbKeyPID',
            //         optionalHelp: 'UsbKeyPID',
            //     }
            // },
            UkeyUPassword: {
                type: 'string',
                title: 'UsbKey用户口令',
                minLength: 6,
                maxLength: 18,
                ui: {
                    type: 'password',
                    placeholder: 'UsbKey用户口令',
                    optionalHelp: 'UsbKey用户口令',
                    hidden:false,
                }
                // }, name1: {
                //     type: 'string',
                //     title: 'UsbKey开发商口令',
                //     minLength: 6,
                //     maxLength: 18,
                //     ui: {
                //         type: 'password',
                //         placeholder: 'UsbKey开发商口令',
                //         optionalHelp: 'UsbKey开发商口令',
                //     }
            }, remark: {
                type: 'string',
                title: '备注信息',
                //minLength: 6,
                maxLength: 200,
                ui: {
                    placeholder: '备注信息',
                    optionalHelp: '备注信息',
                    widget: 'textarea',
                    autosize: { minRows: 2, maxRows: 6 },
                }
            }
        }, required: ['usbkeyNumber', 'usbkeyType', 'UkeyUPassword'],
        ui: {
            grid: {
                span: 24,
            }
        }
    };

    schema1: SFSchema = {
        properties: {
            usbkeyType: {
                type: 'string',
                title: '类型',
                enum: [{ label: 'Rockey1', value: 'rockey1' }, { label: 'Rockey3', value: 'rockey3' }],
                ui: {
                    widget: 'select',
                    placeholder: '选择Rockey类型',
                    change: (ngModel:any)=>{
                        //this.item = this.schema.properties.UkeyUPassword.ui;
                        //this.item
                        // = false;
                        this.onChange(ngModel);
                    },
                    optionalHelp: '选择Rockey类型',
                },
            }, usbkeyNumber: {
                type: 'string',
                title: 'UsbKey编号',
                minLength: 16,
                maxLength: 200,
                readOnly: true,
                ui: {
                    placeholder: '请获取UsbKey设备唯一编号',
                    optionalHelp: 'UsbKey设备唯一编号',
                }
            },
            // vendorId: {
            //     type: 'string',
            //     title: 'UsbKeyPID',
            //     minLength: 6,
            //     maxLength: 18,
            //     ui: {
            //         type: 'password',
            //         placeholder: 'UsbKeyPID',
            //         optionalHelp: 'UsbKeyPID',
            //     }
            // },
            UkeyUPassword: {
                type: 'string',
                title: 'UsbKey用户口令',
                minLength: 6,
                maxLength: 18,
                ui: {
                    type: 'password',
                    placeholder: 'UsbKey用户口令',
                    optionalHelp: 'UsbKey用户口令',
                    hidden:true,
                }
                // }, name1: {
                //     type: 'string',
                //     title: 'UsbKey开发商口令',
                //     minLength: 6,
                //     maxLength: 18,
                //     ui: {
                //         type: 'password',
                //         placeholder: 'UsbKey开发商口令',
                //         optionalHelp: 'UsbKey开发商口令',
                //     }
            }, remark: {
                type: 'string',
                title: '备注信息',
                //minLength: 6,
                maxLength: 200,
                ui: {
                    placeholder: '备注信息',
                    optionalHelp: '备注信息',
                    widget: 'textarea',
                    autosize: { minRows: 2, maxRows: 6 },
                }
            }
        }, required: ['usbkeyNumber', 'usbkeyType'],
        ui: {
            grid: {
                span: 24,
            }
        }
    };
    schema2: SFSchema = {
        properties: {
            usbkeyType: {
                type: 'string',
                title: '类型',
                enum: [{ label: 'Rockey1', value: 'rockey1' }, { label: 'Rockey3', value: 'rockey3' }],
                ui: {
                    widget: 'select',
                    placeholder: '选择Rockey类型',
                    change: (ngModel:any)=>{
                        //this.item = this.schema.properties.UkeyUPassword.ui;
                        //this.item
                        // = false;
                        this.onChange(ngModel);
                    },
                    optionalHelp: '选择Rockey类型',
                },
            }, usbkeyNumber: {
                type: 'string',
                title: 'UsbKey编号',
                minLength: 16,
                maxLength: 200,
                readOnly: true,
                ui: {
                    placeholder: '请获取UsbKey设备唯一编号',
                    optionalHelp: 'UsbKey设备唯一编号',
                }
            },
            // vendorId: {
            //     type: 'string',
            //     title: 'UsbKeyPID',
            //     minLength: 6,
            //     maxLength: 18,
            //     ui: {
            //         type: 'password',
            //         placeholder: 'UsbKeyPID',
            //         optionalHelp: 'UsbKeyPID',
            //     }
            // },
            UkeyUPassword: {
                type: 'string',
                title: 'UsbKey用户口令',
                minLength: 6,
                maxLength: 18,
                ui: {
                    type: 'password',
                    placeholder: 'UsbKey用户口令',
                    optionalHelp: 'UsbKey用户口令',
                    hidden:false,
                }
                // }, name1: {
                //     type: 'string',
                //     title: 'UsbKey开发商口令',
                //     minLength: 6,
                //     maxLength: 18,
                //     ui: {
                //         type: 'password',
                //         placeholder: 'UsbKey开发商口令',
                //         optionalHelp: 'UsbKey开发商口令',
                //     }
            }, remark: {
                type: 'string',
                title: '备注信息',
                //minLength: 6,
                maxLength: 200,
                ui: {
                    placeholder: '备注信息',
                    optionalHelp: '备注信息',
                    widget: 'textarea',
                    autosize: { minRows: 2, maxRows: 6 },
                }
            }
        }, required: ['usbkeyNumber', 'usbkeyType', 'UkeyUPassword'],
        ui: {
            grid: {
                span: 24,
            }
        }
    };
    constructor(
        public initSer: InitializeService,
        public msg: NzMessageService,
        public el: ElementRef,
    ) { }

    // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
    _onReuseInit() {
        this.ngOnInit();
    }

    // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
    _onReuseDestroy() { }

    ngOnInit() {

    }
    submit(e: UsbKayIteam) {
        if(e.usbkeyType === 'rockey1'){
            // 初始化用户密码
            const userMsg = RockeyOne.changeUserPin(this.initvendorId, this.initUserPin, e.UkeyUPassword);
            e.userPin = e.UkeyUPassword;
            if (userMsg.status == 0) {
                // 初始化开发商口令
                const soMsg = RockeyOne.produceSoPin(this.initvendorId, this.initsoPin, this.soPin);
                if (soMsg.status == 1) {
                    this.msg.error(soMsg.msg);
                    return;
                }
                // 初始化pid

                const soPin = soMsg.msg;
                e.soPin = soPin;
                // this.UsbKayIteam.soPin = soPin;
                const pidMsg = RockeyOne.producePID(this.initvendorId, soPin, this.vendorId);
                if (pidMsg.status == 1) {
                    this.msg.error(pidMsg.msg);
                    return;
                }
                // 生成密钥对
                const PId = pidMsg.msg;
                e.vendorId = PId;
                Object.assign(e, this.params);
                Object.assign(e, { soPingKey: this.soPin, vendorIdKey: this.vendorId });
                // 保存数据到数据库
                this.initSer.saveUkey(e).subscribe((res: ApiResToComponent) => {
                    if (res) {
                        this.params = {};
                    }
                });

            } else { 
                this.msg.error(userMsg.msg); 
            }
        }else{
            // 初始化用户密码
            const userMsg = RockeyThree.verifySoPin(this.initvendorIdThree, this.initSoPinThree);
            if (userMsg.status == 0) {
                // 初始化开发商口令
                const soMsg = RockeyThree.changeSoPin(this.initvendorIdThree, this.initSoPinThree, this.initSoPinThree);
                if (soMsg.status == 1) {
                    this.msg.error(soMsg.msg);
                    return;
                }
                // 初始化pid

                const soPin = soMsg.msg;
                e.soPin = this.initSoPinThree;
                // this.UsbKayIteam.soPin = soPin;
                const pidMsg = RockeyThree.producePID(this.initvendorIdThree, this.initSoPinThree, this.vendorId);
                if (pidMsg.status == 1) {
                    this.msg.error(pidMsg.msg);
                    return;
                }
                const PId = pidMsg.msg;
                e.vendorId = PId;
                Object.assign(e, this.params);
                Object.assign(e, { soPingKey: this.soPin, vendorIdKey: this.vendorId });
                // 保存数据到数据库
                this.initSer.saveUkey(e).subscribe((res: ApiResToComponent) => {
                    if (res) {
                        this.params = {};
                    }
                });

            } else { 
                this.msg.error(userMsg.msg); 
            }
        }
    }

    onChange(e){
        if(e === 'rockey3'){
            this.params = {usbkeyType:'rockey3'};
            this.schema = this.schema1;
        }else if(e === 'rockey1'){
            this.params = {usbkeyType:'rockey1'};
            this.schema = this.schema2;
        }else{
            this.schema = this.schema;
        }
    }

    find(e) {
        const uType = e.usbkeyType;
        if (uType === 'rockey1') {
            const Hid = RockeyOne.getHid(this.initvendorId);
            if (Hid.status == 0) {
                this.params = {
                    usbkeyNumber: Hid.msg,
                    usbkeyType: uType
                };
            } else if (Hid.status == 1) {

                this.msg.error(Hid.msg + '，请确认你是否已插入设备或设备已被初始化，如有疑问请联系管理员！');
            } else if (Hid.status == 2) {

                this.msg.error(Hid.msg + '请确认设备是否已被初始化，如有疑问请联系管理员！');
            } else if (Hid.status == 3) {

                this.msg.error(Hid.msg + '，如有疑问请联系管理员！');
            } else {

                this.msg.error('初始化异常，请联系管理员！');
            }

        } else if (uType == 'rockey3') {

            const Hid = RockeyThree.r3GetHardID(this.initvendorIdThree);
            if (Hid.status == 0) {
                this.params = {
                    usbkeyNumber: Hid.msg,
                    usbkeyType: uType
                };
            } else if (Hid.status == 1) {

                this.msg.error(Hid.msg + '，请确认你是否已插入设备或设备已被初始化，如有疑问请联系管理员！');
            } else if (Hid.status == 2) {

                this.msg.error(Hid.msg + '请确认设备是否已被初始化，如有疑问请联系管理员！');
            } else if (Hid.status == 3) {

                this.msg.error(Hid.msg + '，如有疑问请联系管理员！');
            } else {

                this.msg.error('初始化异常，请联系管理员！');
            }
        } else {
            this.msg.error('请先选择Rockey类型');
        }


    }
    reset(f) {
        this.params = {};
        this.schema = this.schema2;
        f.reset();

    }

}
