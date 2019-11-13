import { STColumn } from '@delon/abc';

export const LIST_USBKEY_GEN_COLUMNS: STColumn[] = [
  {
    title: '合同编号',
    index: 'contractNum',
    fixed: 'left',
    width: '15%',
    className: 'text-center',
  },
  {
    title: '合同名称',
    index: 'contractName',
    fixed: 'left',
    width: '15%',
    className: 'text-center',
  },
  // {
  //   title: '产品名称',
  //   index: 'productName',
  //   className: 'text-center',
  //   width: '18%',
  // },
  // {
  //   title: '产品功能',
  //   index: 'json',
  //   className: 'text-center',
  //   width: '20%',
  // },
  {
    title: '合同甲方',
    index: 'customerName',
    className: 'text-center',
    width: '10%',
  },
  {
    title: '合同乙方',
    index: 'userName',
    className: 'text-center',
    width: '10%',
  },
];
