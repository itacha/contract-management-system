import { SFSchema } from '@delon/form';

export const SEARCH_VERIFY_CONTRACT_SCHEMA: SFSchema = {
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
     
    },
};
