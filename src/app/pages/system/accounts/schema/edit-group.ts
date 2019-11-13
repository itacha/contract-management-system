import { SFSchema, FormProperty, PropertyGroup } from '@delon/form';

export const EDIT_USERGROUP_SCHEMA: SFSchema = {
  properties: {
    groupName: {
      type: 'string',
      title: '分组名称',
      ui: {
        placeholder: '请输入分组名称',
        grid: {
          span: 12,
        },
      },
      maxLength: 20,
    },
    groupCode: {
      type: 'string',
      title: '分组编码',
      ui: {
        placeholder: '请输入分组编码',
        grid: {
          span: 12,
        },
      },
      maxLength: 20,
    },
    parentId: {
      type: 'string',
      title: '父级节点',
      ui: {
        grid: {
          span: 12,
        },
        widget: 'tree-select',
        asyncData:() =>  this.asyncData()
      }
    },
    groupDesc: {
      type: 'string',
      title: '分组描述',
      ui: {
        grid: {
          span: 12,
        },
      },
      maxLength: 200,
    },
    groupSort: {
      type: 'number',
      title: '分组排序',
      ui: {
        grid: {
          span: 12,
        },
      },
      maxLength: 3,
    },
    remark: {
      type: 'string',
      title: '备注',
      ui: {
        placeholder: '请输入备注',
        grid: {
          span: 24,
        },
        widget: 'textarea',
        autosize: { minRows: 2, maxRows: 6 },
      },
      maxLength: 400,
    },
  },
  required: ['groupName', 'groupCode'],
  ui: {
    spanLabelFixed: 100,
    grid: {
      span: 24,
    },
  },
};
