import { STColumn } from '@delon/abc';

export const LIST_ACCOUNTS_DETAIL_COLUMNS: STColumn[] = [
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
    width: '130px',
    className: 'text-center',
  },
  {
    title: '性别',
    index: 'sex',
    width: '80px',
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
    title: '所属分组',
    index: 'groupName',
    width: '130px',
    className: 'text-center',
  },
  {
    title: '联系方式',
    index: 'mainTelphone',
    width: '130px',
    className: 'text-center',
  },
  {
    title: '用户状态',
    index: 'userStatus',
    width: '80px',
    type: 'tag',
    tag: {
      1: { text: '有效', color: 'green' },
      0: { text: '禁用', color: 'red' },
    },
    className: 'text-center',
  },
];
