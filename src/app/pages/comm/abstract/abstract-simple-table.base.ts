import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STColumn } from '@delon/abc';
import { ApiResToComponent } from 'app/basic';
import { ScrollParmas } from './interface';

/**
 * 根据url请求所有数据后再赋值到表格
 */
@Injectable()
export abstract class BaseOfSimpleTable implements OnInit {
  constructor() {}

  // 请求数据的参数
   defaultDataRules: any = {};
  searchDataRules: any = Object.assign({}, this.defaultDataRules);

  abstract columns: STColumn[] = [];

  ngOnInit() {
    this.sendDataToList(this.getAllListData());
  }
  // 根据条件搜索数据
  startSearchData(): void {
    this.sendDataToList(this.getListDataOfRules());
  }
  // 重新加载数据
  reLoadData(): void {
    this.sendDataToList(this.getAllListData());
  }

  // 表格尺寸
  public tableSize = 'small';
  // 表格数据列表
  public DataList = [];

  // 默认分页数
  public ps = 20;
  // 是否在加载数据
  public isLoading = false;

  // 根据条件搜索信息
  abstract getListDataOfRules(): Observable<ApiResToComponent>;

  // 获取默认的所有数据
  abstract getAllListData(): Observable<ApiResToComponent>;

  // 将数据赋值到数组
  sendDataToList(obserable: Observable<ApiResToComponent>): void {
    this.isLoading = true;
    obserable.subscribe((response: ApiResToComponent) => {
      this.isLoading = false;
      if (response.isComplete) this.DataList = response.items;
    });
  }
  // 版面全屏操作
    scroll: ScrollParmas = { x: '1800px', y: '400px' };
  fullChange(val: boolean) {
        this.scroll = val ? { x: '2000px', y: '400px' } : { x: '1800px', y: '600px' };
  }
}
