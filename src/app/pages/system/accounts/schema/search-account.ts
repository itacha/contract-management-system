import { SFSchema } from '@delon/form';

export const SEARCH_ACCOUNTS_SCHEMA: SFSchema = {
  properties: {
    userName: {
      type: 'string',
      title: '姓名',
      ui: {
        placeholder: '输入姓名',
      },
      maxLength: 20,
    },
    loginName: {
      type: 'string',
      title: '登录名',
      ui: {
        placeholder: '输入登录名',
      },
    },
    userStatus: {
      type: 'string',
      title: '用户状态',
      enum: [{ label: '有效', value: '1' }, { label: '禁用', value: '0' }],
      ui: {
        widget: 'select',
        placeholder: '输入用户状态',
      },
    },
  },
};

export const SEARCH_ACCOUNTS_SCHEMA_MODAL: SFSchema = {
  properties: {
    loginName: {
      type: 'string',
      title: '登录名',
      ui: {
        placeholder: '输入登录名',
      },
      maxLength: 20,
    },
    userStatus: {
      type: 'string',
      title: '用户状态',
      enum: [{ label: '有效', value: '1' }, { label: '禁用', value: '0' }],
      ui: {
        widget: 'select',
        placeholder: '输入用户状态',
      },
    },
  },
};
