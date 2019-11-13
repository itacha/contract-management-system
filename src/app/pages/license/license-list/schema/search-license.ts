import { SFSchema } from '@delon/form';

export const SEARCH_LICENSE_SCHEMA: SFSchema = {
    properties: {
        rockPid: {
            type: 'string',
            title: 'PID',
            ui: {
                placeholder: '输入PID',
                optionalHelp: '输入PID',
            },
            maxLength: 20,
        },
        rockey: {
            type: 'string',
            title: '类型',
            enum: [{ label: 'Rockey1', value: 'rockey1' }, { label: 'Rockey3', value: 'rockey3' }],
            ui: {
                widget: 'select',
                placeholder: '选择Rockey类型',
                optionalHelp: '选择Rockey类型',
            },
        },
        range: {
            type: 'string',
            title: '时间段',
            format: 'date',
            ui: {
                widget: 'date',
                mode: 'range',
                optionalHelp: '选择时间段',
            },
        },
    },
};
