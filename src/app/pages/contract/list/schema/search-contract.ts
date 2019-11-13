import { SFSchema } from '@delon/form';

export const SEARCH_CONTRACT_SCHEMA: SFSchema = {
    properties: {
        contractName: {
            type: 'string',
            title: '合同名称',
            ui: {
                placeholder: '输入合同名称',
            },
            maxLength: 20,
        },
        contractNum: {
            type: 'string',
            title: '合同编号',
            ui: {
                placeholder: '输入合同编号',
            },
            maxLength: 80,
        },
        customerName: {
            type: 'string',
            title: '合同甲方',
            ui: {
                placeholder: '输入合同甲方',
            },
            maxLength: 20,
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
          },
          applyStatus: {
            type: 'string',
            title: 'USBKey状态',
            enum: [
              { label: '未申请', value: '0' },
              { label: '处理中', value: '1' },
              { label: '已生成', value: '2' },
              { label: '拒绝', value: '3' },

            ],
            ui: {
              widget: 'select',
              placeholder: '选择审核状态',
            },
          },
    },
};
