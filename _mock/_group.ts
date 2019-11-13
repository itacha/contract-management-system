import { ColumnSets, FormSets } from 'types/types';
import { deepCopy } from '@delon/util';
import { MockRequest } from '@delon/mock';

const group_columnSets: ColumnSets = {
  default: [
    { title: '姓名', index: 'ac_name', fixed: 'left', width: '100px' },
    {
      title: '用户组',
      index: 'ac_group',
      width: '130px',
      className: 'text-center',
    },
    {
      title: '用户用户组',
      index: 'ac_roles',
      width: '130px',
      className: 'text-center',
    },
    {
      title: '用户状态',
      index: 'ac_status',
      width: '80px',
      type: 'tag',
      tag: {
        true: { text: '可用', color: 'green' },
        false: { text: '禁用', color: 'red' },
      },
      className: 'text-center',
    },
  ],
};

const group_formSets: FormSets = {
  // 默认选项
  default: {
    title: '用户组详情',
    properties: {
      name: {
        type: 'string',
        title: '用户组名',
        description: '请输入用户组名，用户组名最长支持20个字符。',
        ui: {
          placeholder: '请输入用户组名...',
          grid: {
            span: 24,
          },
        },
        maxLength: 20,
      },
      description: {
        type: 'string',
        title: '描述',
        description: '请输入用户组描述信息。',
        default: '无',
        ui: {
          widget: 'textarea',
          placeholder: '请输入用户组描述信息...默认无',
          autosize: { minRows: 2, maxRows: 6 },
          grid: {
            span: 24,
          },
        },
      },
    },
    required: ['name', 'description'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  },
  // 查询选项
  query: {
    title: '查询用户组',
    properties: {
      name: {
        type: 'string',
        title: '用户组名',
        description: '请输入用户组名，用户组名最长支持20个字符。',
        ui: {
          placeholder: '请输入用户组名...',
          grid: {
            span: 24,
          },
        },
        maxLength: 20,
      },
      description: {
        type: 'string',
        title: '描述',
        description: '请输入用户组描述信息。',
        default: '无',
        ui: {
          widget: 'textarea',
          placeholder: '请输入用户组描述信息...默认无',
          autosize: { minRows: 2, maxRows: 6 },
          grid: {
            span: 24,
          },
        },
      },
    },
    required: ['name', 'description'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  },
  // 新增选项
  add: {
    title: '新建用户组',
    properties: {
      name: {
        type: 'string',
        title: '用户组名',
        description: '请输入用户组名，用户组名最长支持20个字符。',
        ui: {
          placeholder: '请输入用户组名...',
          grid: {
            span: 24,
          },
        },
        maxLength: 20,
      },
      description: {
        type: 'string',
        title: '描述',
        description: '请输入用户组描述信息。',
        default: '无',
        ui: {
          widget: 'textarea',
          placeholder: '请输入用户组描述信息...默认无',
          autosize: { minRows: 2, maxRows: 6 },
          grid: {
            span: 24,
          },
        },
      },
    },
    required: ['name', 'description'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  },
  // 编辑选项
  edit: {
    title: '编辑用户组',
    properties: {
      name: {
        type: 'string',
        title: '用户组名',
        description: '请输入用户组名，用户组名最长支持20个字符。',
        ui: {
          placeholder: '请输入用户组名...',
          grid: {
            span: 24,
          },
        },
        maxLength: 20,
      },
      description: {
        type: 'string',
        title: '描述',
        description: '请输入用户组描述信息。',
        default: '无',
        ui: {
          widget: 'textarea',
          placeholder: '请输入用户组描述信息...默认无',
          autosize: { minRows: 2, maxRows: 6 },
          grid: {
            span: 24,
          },
        },
      },
    },
    required: ['name', 'description'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  },
};

const groups_list = {
  list: [
    {
      id: '1',
      name: 'groups_name1',
      checked: false,
      expanded: false,
    },
    {
      id: '2',
      name: 'groups_name2',
      parent_id: '1',
      checked: false,
      expanded: false,
    },
    {
      id: '3',
      name: 'groups_name3',
      parent_id: '1',
      checked: false,
      expanded: false,
    },
    {
      id: '4',
      name: 'groups_name4',
      parent_id: '1',
      checked: false,
      expanded: false,
    },
    {
      id: '5',
      name: 'groups_name5',
      parent_id: '1',
      checked: false,
      expanded: false,
    },
    {
      id: '6',
      name: 'groups_name6',
      parent_id: '1',
      checked: false,
      expanded: false,
    },
    {
      id: '7',
      name: 'groups_name7',
      parent_id: '2',
      checked: false,
      expanded: false,
    },
    {
      id: '8',
      name: 'groups_name8',
      parent_id: '2',
      checked: false,
      expanded: false,
    },
    {
      id: '9',
      name: 'groups_name9',
      parent_id: '3',
      checked: false,
      expanded: false,
    },
  ],
};

export function getGroupAndaccount(RoleID: string | number) {
  return {
    list: groups_list.list,
  };
}

export function getInfomationByGroupID(GroupID: string | number) {
  const ID = GroupID.toString();
  const deepCopy_group_list = deepCopy(groups_list.list);
  let GroupInfomation = {};
  deepCopy_group_list.forEach(element => {
    if (element.id === ID) {
      GroupInfomation = element;
    }
  });
  return GroupInfomation;
}

export const GROUP = {
  '/api/group/query': groups_list,
  '/api/group/config': {
    columnSets: deepCopy(group_columnSets),
    formSets: deepCopy(group_formSets),
  },
  '/api/group/query/roleId/:id': (req: MockRequest) =>
    getGroupAndaccount(req.params.id),
  '/api/group/edit/:id': (req: MockRequest) =>
    getInfomationByGroupID(req.params.id),
};
