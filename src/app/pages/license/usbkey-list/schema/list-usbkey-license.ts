import { STColumn } from '@delon/abc';

export const LIST_USBKEY_LICENSE_COLUMNS: STColumn[] = [
  {
    title: '合同名称',
    index: 'contract.contractName',
    fixed: 'left',
    width: '15%',
    className: 'text-center',
  },
  {
    title: '产品名称',
    index: 'contractProduct.name',
    fixed: 'left',
    width: '15%',
    className: 'text-center',
  },
  // {
  //   title: '产品功能',
  //   index: 'signContent',
  //   fixed: 'left',
  //   width: '20%',
  //   className: 'text-center',
  // },
  {
    title: '授权期限',
    index: 'privateLicense',
    className: 'text-center',
    width: '15%',
  },
  {
    title: 'UsbKey编码',
    index: 'usbkeyId',
    className: 'text-center',
    width: '10%',
  },
  {
    title: 'UsbKey类型',
    index: 'privateNumber',
    className: 'text-center',
    width: '8%',
  },
];
