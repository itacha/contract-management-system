import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ApiResponse } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { UsbkeyService } from '../usbkey.service';
import { SEARCH_USBKEY_SCHEMA } from './schema/search-usbkey';
import { LIST_USBKEY_COLUMNS } from './schema/list-usbkey';
import { ListService } from './list.service';

@Component({
  selector: 'app-usbkey-list-page',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListPageComponent extends BaseOfSimpleTable implements OnInit {
  defaultDataRules: any;

  params: any;
  searchSchema: SFSchema = SEARCH_USBKEY_SCHEMA;

  scroll = { x: '900px' };

  @Input()
  title = 'UsbKey列表';
  head_content = '显示所有UsbKey的信息。';
  param = [];
  ps = 10;
  // UsbKey列表
  DataList = [];

  constructor(public usbkeySer: UsbkeyService, public listSer: ListService) {
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
          click: () => { },
        },
      ],
    },
  ];

  columns: STColumn[] = [...LIST_USBKEY_COLUMNS];

  ngOnInit() {
    // 获取USB Key列表信息
    this.getUsbKeysList();
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();
  }
  // 获取USB Key列表信息
  getUsbKeysList() {
    this.listSer.getUsbKeyList(this.param).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.DataList = res.items;
      }
    });
  }

  // 对USBKey列表条件检索
  searchDataGet(e) {
    Object.assign(this.param, e);
    this.getUsbKeysList();
  }
  reSetDataGet(e) {
    this.param = [];
    this.getUsbKeysList();
  }
  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
}
