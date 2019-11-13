import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { LicenseService } from '../license.service';
import { SEARCH_LICENSE_SCHEMA } from './schema/search-license';
import { LIST_LICENSE_COLUMNS } from './schema/list-license';




@Component({
    selector: 'app-license-list-page',
    templateUrl: './license-list.component.html',
    styleUrls: ['./license-list.component.less'],
})
export class LicenseListPageComponent extends BaseOfSimpleTable implements OnInit {

    defaultDataRules: any;

    params: any;
    searchSchema: SFSchema = SEARCH_LICENSE_SCHEMA;

    scroll = { x: '900px' };

    @Input()
    title = 'License列表';
    head_content = '显示所有License的信息。';

    ps = 10;
    // 日志列表
    logDataList = [];

    constructor(
        public licenseSer: LicenseService
    ) {
        super();
    }

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

    columns: STColumn[] = [...LIST_LICENSE_COLUMNS];

    ngOnInit() {
        // 获取客户列表
        this.getCustomsList();
        // 执行继承对象的ngOnInit方法
        // super.ngOnInit();
    }

    getCustomsList() {
        
    }



    getListDataOfRules(): Observable<ApiResToComponent> {
        throw new Error('Method not implemented.');
    }
    getAllListData(): Observable<ApiResToComponent> {
        throw new Error('Method not implemented.');
    }

}
