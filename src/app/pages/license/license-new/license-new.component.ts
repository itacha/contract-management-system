import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { ApiResToComponent } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { LicenseService } from '../license.service';



@Component({
    selector: 'app-license-new-page',
    templateUrl: './license-new.component.html',
    styleUrls: ['./license-new.component.less'],
})
export class LicenseNewPageComponent implements OnInit {

    @Input()
    title = '生成License';
    head_content = '生成License页面。';

    constructor(
        public licenseSer: LicenseService
    ) { }

    // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
    _onReuseInit() {
        this.ngOnInit();
    }

    // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
    _onReuseDestroy() { }

    operations: STColumn[] = [
        {
            title: '操作',
            buttons: [
                {
                    text: '移出',
                    type: 'del',
                    popTitle: '确定移出吗？',
                    click: () => {
                    },
                },
            ],
        },
    ];

    ngOnInit() {
        // 获取客户列表
        this.getCustomsList();
        // 执行继承对象的ngOnInit方法
        // super.ngOnInit();
    }

    getCustomsList() {
        
    }

}
