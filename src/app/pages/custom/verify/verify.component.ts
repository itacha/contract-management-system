import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { CustomService } from '../custom.service';
import { LIST_CUSTOM_CHECK_COLUMNS } from '../list/schema/list-custom-check';
import { SEARCH_VERIFY_CUSTOM_SCHEMA } from '../list/schema/search-verify-custom';
import { VerifyService } from './verify.service';
import { VerifyEditComponent } from './verify.edit.component';
import { CustomerDetial } from '../list/interface';



@Component({
    selector: 'app-custom-verify-page',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.less'],
})
export class VerifyPageComponent extends BaseOfSimpleTable implements OnInit {

    defaultDataRules: any;

    params: any = {};
    
    searchSchema: SFSchema = SEARCH_VERIFY_CUSTOM_SCHEMA;

    scroll = { x: '900px' };

    @Input()
    title = '客户审核';
    head_content = '显示所有待审核的客户信息。';

    ps = 10;
    // 日志列表
    DataList = [];

    constructor(
        public customSer: CustomService,
        private verifyService:VerifyService,
        public modal: ShowModalService,
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
            title: '操作区',
            buttons: [
              {
                text: '审核',
                type: 'none',
                click: (record: any) => {
                  this.goToVerifyCustomer(record);
                },
              }
            ],
            className: 'text-center',
          },
    ];

    columns: STColumn[] = [...LIST_CUSTOM_CHECK_COLUMNS,...this.operations];

    ngOnInit() {
        // 获取客户列表
        this.getVerifyCustomsList();
        // 执行继承对象的ngOnInit方法
        // super.ngOnInit();
    }
    //获取待审核客户列表
    getVerifyCustomsList() {
        this.verifyService.getVerifyCustomerList({}).subscribe((res: ApiResToComponent) => {
            if (res) {
              this.DataList = res.items;
            }
          });
    }

    //根据条件获取审核客户列表
    searchVerifyCustomsList(param) {
        this.verifyService.getVerifyCustomerList(param).subscribe((res: ApiResToComponent) => {
          console.log(res)
            if (res) {
              console.log(res.items)
              this.DataList = res.items;
            }
          });
    }
    //搜索客户列表
    searchDataGet(event){
        this.params = {};
        if(event.customerName){
            this.params.customerName = event.customerName;
            }
        if(event.createName){
        this.params.createName = event.createName;
        }
        if(event.createTimeStart){
            this.params.createTimeStart = event.createTimeStart;
          }
        if(event.createTimeEnd){
        this.params.createTimeEnd = event.createTimeEnd;
        }
        this.searchVerifyCustomsList(this.params);
    }
   
    //重置查询条件
    reSetDataGet(param){
        this.params = {};
        this.getVerifyCustomsList();
    }
    //弹出审核页面
    goToVerifyCustomer(item: CustomerDetial){
        this.modal
        .creatStaticModal(
            VerifyEditComponent,
          {item:item},'md',
          {
            nzTitle: `审核${item.customerName}的信息`,
          },
        )
        .subscribe(res => {
          if (res) {
            this.searchVerifyCustomsList(this.params);
          }
        });
    }


    getListDataOfRules(): Observable<ApiResToComponent> {
        throw new Error('Method not implemented.');
    }
    getAllListData(): Observable<ApiResToComponent> {
        throw new Error('Method not implemented.');
    }

}
