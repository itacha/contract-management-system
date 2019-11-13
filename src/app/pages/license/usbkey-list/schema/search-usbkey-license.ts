import { SFSchema } from '@delon/form';

export const SEARCH_USBKEY_LICENSE_SCHEMA: SFSchema = {
    properties: {
        contractName: {
            type: 'string',
            title: '合同名称',
            ui: {
                placeholder: '合同名称',
            },
            maxLength: 20,
        },
        usbkeyType: {
            type: 'string',
            title: '类型',
            enum: [{ label: 'Rockey1', value: '1' }, { label: 'Rockey3', value: '3' }],
            ui: {
                widget: 'select',
                placeholder: '选择Rockey类型',
            },
        },
    },
};
