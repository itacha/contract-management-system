import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NzTreeNode, NzTreeComponent, NzModalRef } from 'ng-zorro-antd';
import { SystemService } from '../system.service';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles-permission-choose-page',
  templateUrl: './permission.choose.component.html',
  styles: [],
})
export class PermissionChoosePageComponent implements OnInit {
  @Input()
  includeAllChecked = false;
  @Input()
  roleId: string;

  @Input()
  defaultCheckedKeys = [];
  @Input()
  asyncData: () => Observable<NzTreeNode[]>;
  @ViewChild('treeView')
  treeView: NzTreeComponent;

  searchValue = '';
  // 树形结构
  nodes = [];
  //
  selectedItems = [];
  constructor(
    public systemSer: SystemService,
    public roleSer: RolesService,
    public modalRef: NzModalRef,
  ) {}
  // 初始化，赋值到树形结构
  ngOnInit() {
    this.asyncData().subscribe(res => {
      this.nodes = res;
    });
  }

  // 将选择的值，保存到后端
  save(event?) {
    this.getAllCheckedItems();
    // 取出selectedItems中的menuId
    const menuIds = this.selectedItems.map(a => a.menuId);
    if (this.roleId) {
      const params = {
        roleId: this.roleId,
        menuIds: menuIds,
      };
      this.roleSer.sendPermissionsToServer(params).subscribe(res => {
        this.modalRef.destroy(true);
      });
    }
  }

  // 选中权限项
  selectedChanged(name: string, event: any) {
    this.getAllCheckedItems();
  }

  // 获取所有以选择的菜单项
  getAllCheckedItems() {
    const option = {
      includeHalfChecked: true,
    };
    this.selectedItems = this.systemSer.getCheckedByTreeNode(
      this.nodes,
      option,
    );
    console.log(this.selectedItems);
    
  }

  // 取消并关闭modal
  cancel(event?) {
    this.modalRef.destroy('onCancel');
  }

  /**--------------后面为暂时用不上的功能，以后有需要可以拓展 */
  treeNodeClick(name: string, e: any) {}

  showContextMenu(name: string, e: any) {}

  nodeExpandChanged(name: string, e: any) {}
}
