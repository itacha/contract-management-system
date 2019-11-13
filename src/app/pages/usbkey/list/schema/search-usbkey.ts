import { SFSchema } from '@delon/form';

export const SEARCH_USBKEY_SCHEMA: SFSchema = {
  properties: {
    usbkeyNumber: {
      type: 'string',
      title: 'UsbKey编号',
      ui: {
        placeholder: 'UsbKey编号',
        // optionalHelp: 'UsbKey编号',
      },
      maxLength: 20,
    },
    usbkeyType: {
      type: 'string',
      title: '类型',
      enum: [
        { label: 'Rockey1', value: 'rockey1' },
        { label: 'Rockey3', value: 'rockey3' },
      ],
      ui: {
        widget: 'select',
        placeholder: '选择Rockey类型',
        // optionalHelp: '选择Rockey类型',
      },
    },
    // range: {
    //     type: 'string',
    //     title: '时间段',
    //     format: 'date',
    //     ui: {
    //         widget: 'date',
    //         mode: 'range',
    //         optionalHelp: '选择时间段',
    //     },
    // },
  },
};
