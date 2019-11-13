import { SFSchema } from '@delon/form';

export const SEARCH_VERIFY_CUSTOM_SCHEMA: SFSchema = {
  properties: {
    customerName: {
      type: 'string',
      title: '客户名称',
      ui: {
        placeholder: '输入客户名称',
      },
      maxLength: 20,
    },
    createName: {
      type: 'string',
      title: '创建人',
      ui: {
        placeholder: '输入创建人名称',
      },
    },
    
    createTimeStart: {
      type: 'string',
      title: '时间段',
      format: 'date',
      ui: {
        widget: 'date',
        end: 'createTimeEnd',
        optionalHelp: '选择创建时间段',
    
      },
    },
    createTimeEnd: {
      format: 'date',
      type: 'string', 
    },
    verifyStatus: {
      type: 'string',
      title: '审核状态',
      enum: [
        { label: '待审核', value: '0' },
        { label: '审核通过', value: '1' },
        { label: '审核不通过', value: '2' },
      ],
      ui: {
        widget: 'select',
        placeholder: '选择审核状态',
      },
      default: '0',
      readOnly: true,
    },
  },
};
