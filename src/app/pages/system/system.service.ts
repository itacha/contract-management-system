import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
import { ArrayService } from '@delon/util';
import { Observable } from 'rxjs';

@Injectable()
export class SystemService {
  constructor(public client: _HttpClient, public arrSer: ArrayService) {}

  /**
   * 根据角色ID返回一个nz-tree的数据结构
   * @param menuList 菜单对象列表
   */
  menuTreeNode(menuList) {
    return new Observable(observer => {
      const option = {
        idMapName: 'menuId',
        titleMapName: 'menuName',
        parentIdMapName: 'menuParentId',
        checkedMapname:'chose'
      };
      const ListOfTreeNode = this.arrSer.arrToTreeNode(menuList, option);
      observer.next(ListOfTreeNode);
      observer.complete();
    });
  }
    /**
   * 根据分组列表返回一个nz-tree的数据结构
   * @param groupList 菜单对象列表
   */
  groupTreeNode(groupList) {
    return new Observable(observer => {
      const option = {
        idMapName: 'groupId',
        titleMapName: 'groupName',
        parentIdMapName: 'parentId',
        checkedMapname:'chose'
      };
      const ListOfTreeNode = this.arrSer.arrToTreeNode(groupList, option);
      observer.next(ListOfTreeNode);
      observer.complete();
    });
  }

  /**
   * 获取所有已经选中的 `key` 值
   */
  getCheckedLinesByTreeNode(
    tree: NzTreeNode[],
    options?: {
      /** 是否包含半选状态的值，默认：`true` */
      includeHalfChecked?: boolean;
    },
  ): any[] {
    options = Object.assign(
      {
        includeHalfChecked: true,
      },
      options,
    );
    const checkedLines: any[] = [];
    this.arrSer.visitTree(tree, (item: NzTreeNode) => {
      console.log(item);
      
      if (
        (item.isChecked && item.isLeaf) ||
        (options.includeHalfChecked && item.isHalfChecked)
      ) {
        checkedLines.push(item.origin);
      }
    });
    return checkedLines;
  }

   /**
   * 获取所有已经选中的 `key` 值 包含根节点
   */
  getCheckedByTreeNode(
    tree: NzTreeNode[],
    options?: {
      /** 是否包含半选状态的值，默认：`true` */
      includeHalfChecked?: boolean;
    },
  ): any[] {
    options = Object.assign(
      {
        includeHalfChecked: true,
      },
      options,
    );
    const checkedLines: any[] = [];
    this.arrSer.visitTree(tree, (item: NzTreeNode) => {
      console.log(item);
      
      if (
        (item.isChecked) ||
        (options.includeHalfChecked && item.isHalfChecked)
      ) {
        checkedLines.push(item.origin);
      }
    });
    return checkedLines;
  }
}
