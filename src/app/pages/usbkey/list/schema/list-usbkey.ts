import { STColumn } from '@delon/abc';

export const LIST_USBKEY_COLUMNS: STColumn[] = [
  {
    title: 'UsbKey编号',
    index: 'usbkeyNumber',
    className: 'text-center',
    width: '20%',
  },
  {
    title: 'UsbKey类型',
    index: 'usbkeyType',
    className: 'text-center',
  },
  {
    title: '状态',
    index: 'usbkeyStatus',
    className: 'text-center',
    type: 'tag',
    tag: {
      0: {
        text: '未使用',
        color: 'green',
      },
      1: { text: '在使用', color: 'red' },
    },
    width: '15%',
  }, {
    title: 'UsbKey用户密码',
    index: 'userPin',
    className: 'text-center',
    width: '15%',
  },
  {
    title: '备注',
    index: 'remark',
    className: 'text-center',
    width: '35%',
  },
];
