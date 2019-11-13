import { SFSchema } from '@delon/form';

export const SEARCH_USBKEY_GEN_SCHEMA: SFSchema = {
    properties: {
        contractName: {
            type: 'string',
            title: '合同名称',
            ui: {
                placeholder: '合同名称',
            },
            maxLength: 20,
        },
    },
};
