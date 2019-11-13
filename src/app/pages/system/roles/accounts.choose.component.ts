import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { RolesService } from './roles.service';
import { UrlOfSimpleTable } from '../../comm';
import { STColumn, STChange, STReq, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SEARCH_ACCOUNTS_SCHEMA_MODAL } from '../accounts/schema/search-account';
import { LIST_ACCOUNTS_COLUMNS } from '../accounts/schema/list-account';
import { ApiUrlDataService } from 'app/basic';

@Component({
  selector: 'app-roles-accounts-choose-page',
  templateUrl: './accounts.choose.component.html',
  styles: [
    `
      :host ::ng-deep .ant-select-selection--single {
        min-width: 174px;
      }
    `,
  ],
})
export class AccountsChoosePageComponent extends UrlOfSimpleTable
  implements OnInit {
  @Input()
  roleId: string | number;
  // 搜索条件
  params: any ;
  // 请求地址
  url: string = this.apiUrl.Sysrole.findUserNotInRoleId;
  // 请求参数
  @Input()
  reqReName: STReq; 
  
  resReName: STRes = {
    reName: {
      total: 'count',
      list: 'data',
    },
  };
  // 表格大小
  tableSize = 'small';
  // 表格横向滚动距离
  scroll = { x: '800px' };

  operations: STColumn[] = [
    { title: '编号', fixed: 'left', index: 'userId', type: 'checkbox' },
  ];
  // 表单项
  columns: STColumn[] = [...this.operations, ...LIST_ACCOUNTS_COLUMNS];
  // 搜索表单
  searchSchema: SFSchema = SEARCH_ACCOUNTS_SCHEMA_MODAL;
  // 选中的对象
  selectedItems = [];

  ngOnInit(): void { 
    this.params = {
      roleId: this.roleId
    };
  }

  constructor(
    private apiUrl: ApiUrlDataService,
    public roleSer: RolesService,
    public modalRef: NzModalRef,
  ) {
    super();
  }

  // 监控选中项的变化
  change(e: STChange) {
    if (e.checkbox) this.selectedItems = e.checkbox.map(a => a.userId);
  }

  // 取消并关闭modal
  cancel(e) {
    this.modalRef.destroy(false);
  }

  // 将选择的值，保存到后端
  save(e) {
    if (this.roleId) {
      const params = {
        roleId: this.roleId,
        userIds: this.selectedItems,
      };
      this.roleSer.sendUsersToServer(params).subscribe(() => {
        this.modalRef.destroy(true);
      });
    }
  }
}
