import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from '../system.service';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { LIST_LOG_COLUMNS } from 'app/pages/system/accounts/schema/list-account';
import { LogsService } from './log.service';


@Component({
  selector: 'app-log-page',
  templateUrl: './log.component.html',
  styles: [],
})
export class logPageComponent extends BaseOfSimpleTable implements OnInit {

  defaultDataRules: any;

  params: any;
  searchSchema: SFSchema;

  scroll = { x: '900px' };

  @Input()
  domain = 'role';
  title = '操作日志';
  head_content = '显示所有用户操作信息。';
  selectedItem: any = {};
  slaveQueryParams: any = {};
  count: number;
  RoleUserList = [];
  ps = 10;
  // 日志列表
  logDataList = [];

  constructor(
    public systemSer: SystemService,
    public logSer: LogsService
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
          click: item => {

          },
        },
      ],
    },
  ];

  columns: STColumn[] = [...LIST_LOG_COLUMNS];

  ngOnInit() {
    // 获取角色列表
    this.getLogsList();
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();
  }

  getLogsList() {
    this.logSer.getAllLogsList().subscribe((res: ApiResToComponent) => {
      if (res) {
        this.logDataList = res.items;
      }
    });
  }



  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error("Method not implemented.");
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error("Method not implemented.");
  }

}
