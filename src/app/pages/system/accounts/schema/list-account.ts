import { STColumn } from '@delon/abc';

export const LIST_ACCOUNTS_COLUMNS: STColumn[] = [
  {
    title: '姓名',
    index: 'userName',
    fixed: 'left',
    width: '150px',
    className: 'text-center',
  },
  {
    title: '登录名',
    index: 'loginName',
    // width: '130px',
    className: 'text-center',
  },
  {
    title: '性别',
    index: 'sex',
    // width: '80px',
    className: 'text-center',
    type: 'tag',
    tag: {
      male: {
        text: '男',
        color: 'red',
      },
      female: { text: '女', color: 'green' },
    },
  },
  {
    title: '联系方式',
    index: 'mainTelphone',
    // width: '130px',
    className: 'text-center',
  },
  {
    title: '用户状态',
    index: 'userStatus',
    // width: '80px',
    type: 'tag',
    tag: {
      1: { text: '有效', color: 'green' },
      0: { text: '禁用', color: 'red' },
    },
    className: 'text-center',
  },
];

export const LIST_LOG_COLUMNS: STColumn[] = [
  {
    title: '操作人员',
    index: 'logOperaterName',
    className: 'text-center',
  },
  {
    title: '操作类型',
    index: 'logOperateType',
    // width: '130px',
    className: 'text-center',
    type: 'tag',
    tag: {
      1: { text: '增加', color: 'Blue' },
      2: { text: '删除', color: 'red' },
      3: { text: '修改', color: 'Blue' },
      4: { text: '查询', color: 'green' },
    },
  },
  {
    title: '操作人IP',
    index: 'logOperaterIp',
    // width: '80px',
    className: 'text-center',
  },
  {
    title: '操作描述',
    index: 'logOperateDesc',
    // width: '130px',
    className: 'text-center',
  },
  {
    title: '操作模块',
    index: 'logOperateModule',
    // width: '80px',
    className: 'text-center',
  },
  {
    title: '操作时间',
    index: 'logOperateTime',
    // width: '130px',
    className: 'text-center',
    type: "date",
  },
];