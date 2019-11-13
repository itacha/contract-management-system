import { OnInit, Injectable, ViewChild } from '@angular/core';
import { STColumn, STComponent, STReq, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ScrollParmas } from './interface';

/**
 * 根据url请求单页数据，后台翻页
 */
@Injectable()
export abstract class UrlOfSimpleTable implements OnInit {
  @ViewChild('st')
  st: STComponent;

  constructor() {
    
  }
  // 请求数据的参数
   params: any = {};
  abstract url: string;
  abstract columns: STColumn[] = [];
  abstract searchSchema: SFSchema = {};

  // 重命名请求参数
  reqReName: STReq = {
    params: this.params,
    reName: {
      pi: 'pageNum',
      ps: 'pageSize',
    },
  };
  resReName: STRes = {
    reName: {
      total: 'count',
      list: 'data',
    },
  };

  searchDataRules: any;

  ngOnInit() {
    this.searchDataRules = Object.assign({}, this.params);
  }

  // 表格尺寸
  public tableSize = 'small';

  // 默认分页数
  public ps = 10;
  // 是否在加载数据
  public isLoading = false;

  // 版面全屏操作
  scroll: ScrollParmas = { x: '1800px', y: '400px' };
    
  fullChange(val: boolean) {
      this.scroll = val ? { x: '2000px', y: '400px' } : { x: '1800px', y: '600px' };
  }

  // 根据时间条件获取数据
  getDataByDate(st: STComponent, data: any): void {
    const params = Object.assign(this.searchDataRules, data);
    st.reset(params);
  }

  // 重置表格的搜索事件
  reSetDataGet(event): void {
    this.st.reset(event);
  }
  // 根据条件搜索数据
  searchDataGet(event): void {
    this.st.reset(event);
  }
}
