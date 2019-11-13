import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
@Injectable()
export class ApiUrlDataService {
  // 接口基础地址(开发环境使用)
  // apiHost = 'http://192.168.1.254:8081/oms';
  apiHost = 'http://192.168.2.156:8080/oms';
  // apiHost = 'http://192.168.4.58:8080';
  // 接口基础地址 (生产环境使用)
  // apiHost = environment.SERVER_URL+'oms';
  // 接口版本
  _version = '';

  // 初始化
  constructor() {}

  // 客人/会员接口
  customer: any = {
    // 用户/会员信息
    curd: this.apiHost + this._version + '/optometry/customer',
    setstatus: this.apiHost + this._version + '/optometry/customer/status',
    getall: this.apiHost + this._version + '/optometry/customer/list',
  };

  // 基础权限接口
  auth: any = {
    // 用户登录
    login: this.apiHost + this._version + '/login',
    // 检查token，判断登录状态
    checktoken: this.apiHost + this._version + '/checkLogin',
    // 根据token验证用户密码
    verifypassword: this.apiHost + this._version + '/passwd',
  };
  // 系统用户接口
  Sysuser: any = {
    // 保存用户
    saveSysUser: this.apiHost + this._version + '/sysUser/save',
    // 更新用户
    updateSysUser: this.apiHost + this._version + '/sysUser/update',
    // 跟新用户状态
    updateStatus: this.apiHost + this._version + '/sysUser/updateStatus',
    // 重置用户密码
    resetPassWord: this.apiHost + this._version + '/sysUser/resetPassWord',
    // 删除用户
    delete: this.apiHost + this._version + '/sysUser/delete',
    // 获取用户列表
    findList: this.apiHost + this._version + '/sysUser/findList',
    // 更改密码
    updatePassWord: this.apiHost + this._version + '/sysUser/updatePassWord',
  };

  // 系统角色接口
  Sysrole: any = {
    // 保存角色
    saveRole: this.apiHost + this._version + '/sys/role/addRole',
    // 更新角色
    updateRole: this.apiHost + this._version + '/sys/role/editRole',
    // 获取所有角色
    findRoleAllList: this.apiHost + this._version + '/sys/role/findRoleAllList',
    // 获取角色列表
    getRoleList: this.apiHost + this._version + '/sys/role/findRoleList',
    // 获取角色列表
    findUserListByRoleId:
      this.apiHost + this._version + '/sys/role/findUserListByRoleId',
    // 删除角色
    delRole: this.apiHost + this._version + '/sys/role/delRole',
    // 根据角色ID获取菜单及权限
    findMenuListByRoleId:
      this.apiHost + this._version + '/sys/role/findMenuListByRoleId',
    // 将权限分配到角色
    assignMenusToRole:
      this.apiHost + this._version + '/sys/role/assignMenusToRole',
    // 将用户分配到角色
    addUsersToRole: this.apiHost + this._version + '/sys/role/addUsersToRole',
    // 将用户从角色中删除
    removeUserFromRole:
      this.apiHost + this._version + '/sys/role/deleteUserByRoleId',
    // 根据角色ID获取不在该角色下的用户列表
    findUserNotInRoleId:
      this.apiHost + this._version + '/sys/role/findUserNotInRoleId',
  };

  // 菜单接口
  Sysmenu: any = {
    // 获取菜单列表
    findMenuList: this.apiHost + this._version + '/sys/menu/findMenuList',
    // 获取角色权限列表
    findAllMenuList: this.apiHost + this._version + '/sys/menu/findAllMenuList',
    // 获取当前登陆用户菜单列表
    findUserAllMenuList:
      this.apiHost + this._version + '/sys/menu/findUserAllMenuList',
  };
  // 用户分组接口
  SysUserGroup: any = {
    // 获取用户分组
    findeUserGroupList: this.apiHost + this._version + '/sysUserGroup/findList',
    // 保存用户分组
    saveUserGroup: this.apiHost + this._version + '/sysUserGroup/save',
    // 删除用户分组
    deleteUserGroup: this.apiHost + this._version + '/sysUserGroup/delete',
    // 修改用户分组
    updateUserGroup: this.apiHost + this._version + '/sysUserGroup/update',
    // 查询单个用户分组
    findUserGroupById: this.apiHost + this._version + '/sysUserGroup/findById',
    // 获取分组树
    findUserGroupTree:
      this.apiHost + this._version + '/sysUserGroup/findListTree',
    // 获取分组与用户层级选择树
    findUserGroupSelect:
      this.apiHost + this._version + '/sysUserGroup/findListSelect',
  };

  // 日志接口
  SysLog: any = {
    // 获取所有日志信息
    getAllLogsList: this.apiHost + this._version + '/sys/log/findLogAllList',
  };
  // usbkey接口
  usbKey: any = {
    // 获取所有usbKey列表
    gatAllUsbKeyList:
      this.apiHost + this._version + '/bus/usbkey/findUsbkeyAllList',
    addUsbkey: this.apiHost + this._version + '/bus/usbkey/addUsbkey',
    checkUsbkey: this.apiHost + this._version + '/bus/usbkey/checkUsbkey',
    sign: this.apiHost + this._version + '/sys/sign/signData',
    saveUkey: this.apiHost + this._version + '/bus/usbkey/info/save',
    list: this.apiHost + this._version + '/bus/usbkey/info/findList',
    // lisence下载
    exportLisence:
      this.apiHost + this._version + '/bus/usbkey/info/exportLisence',
  };
  // 客户管理接口
  BusCustomer: any = {
    // 客户列表
    getAllCustomerList:
      this.apiHost + this._version + '/bus/customer/findCustomerAllList',
    // 审核通过的客户列表
    getAllCustomerForContractList:
      this.apiHost +
      this._version +
      '/bus/customer/findCustomerAllListForContract',
    // 保存客户
    saveCustomer: this.apiHost + this._version + '/bus/customer/addCustomer',
    // 修改客户信息
    updateCustomer: this.apiHost + this._version + '/bus/customer/editCustomer',
    // 删除客户信息
    deleteCustomer: this.apiHost + this._version + '/bus/customer/delCustomer',
    // 查询待审核客户列表
    getVerifyCustomerList:
      this.apiHost + this._version + '/bus/customer/findVerifyList',
    // 审核客户信息
    verifyCustomer:
      this.apiHost + this._version + '/bus/customer/verifyCustomer',
  };
  BusContract: any = {
    // 合同主信息列表
    getContractList: this.apiHost + this._version + '/bus/contract/findList',
    //合同关联产品信息
    getContractProduct:
      this.apiHost + this._version + '/bus/contract/findProductDetailById',
    // 新增合同主信息
    addContract: this.apiHost + this._version + '/bus/contract/save',
    // 修改合同主信息
    updateContract: this.apiHost + this._version + '/bus/contract/update',
    // 删除合同：
    deleteContract: this.apiHost + this._version + '/bus/contract/del',
    // 审核客户信息
    verifyContract: this.apiHost + this._version + '/bus/contract/review',
    // 新增合同补充信息
    addContarctInfo: this.apiHost + this._version + '/bus/contract/info/save',
    // 新增关联成员
    addLink: this.apiHost + this._version + '/bus/contract/info/saveInfo',
    // 新增合同快照
    addContractSnap:
      this.apiHost + this._version + '/bus/contract/Snapshot/save',
    // 合同快照列表
    getContractSnapList:
      this.apiHost + this._version + '/bus/contract/Snapshot/findByContractId',
    // 关联成员列表
    getLinkList:
      this.apiHost + this._version + '/bus/contract/info/findByLinkId',
    // 补充信息列表:
    getContractInfoList:
      this.apiHost + this._version + '/bus/contract/info/findByContractId',
    // 查询合同全部信息:
    findDetailById:
      this.apiHost + this._version + '/bus/contract/findDetailById',
    // 查询合同列表信息usbkey使用接口
    findContractListByStatus:
      this.apiHost + this._version + '/bus/contract/findList',
    // 上传附件:
    uploadAttachment:
      this.apiHost + this._version + '/bus/contract/uploadAttachment',
    // 查找所有附件信息
    getAttachmentAllList:
      this.apiHost + this._version + '/bus/contract/findAllAttachment',
    // 删除附件
    deleteAttachementById:
      this.apiHost + this._version + '/bus/contract/deleteAttachmentById',
    // 申请生成UKEY
    applyUsbkey: this.apiHost + this._version + '/bus/contract/applyUkey',
    // 拒绝生成Ukey
    refuseUkey: this.apiHost + this._version + '/bus/contract/refuseUkey',
  };
  // 产品管理模块
  product: any = {
    findAllProduct:
      this.apiHost + this._version + '/sys/product/findAllProduct',
    delProduct: this.apiHost + this._version + '/sys/product/del',
    editProduct: this.apiHost + this._version + '/sys/product/edit',
    saveProduct: this.apiHost + this._version + '/sys/product/save',
    deleteAttachementById:
      this.apiHost + this._version + '/bus/contract/deleteAttachmentById',
    findById: this.apiHost + this._version + '/sys/product/findById',
  };
}
