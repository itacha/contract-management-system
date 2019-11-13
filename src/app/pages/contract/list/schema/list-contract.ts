import { STColumn } from '@delon/abc';

export const LIST_CONTRACT_COLUMNS: STColumn[] = [
  {
    title: '合同编号',
    index: 'contractNum',
    fixed: 'left',
    className: 'text-center',
    width: '10%',
  },
  {
    title: '合同名称',
    index: 'contractName',
    className: 'text-center',
    width: '10%',
    format: function(cell: any, row: any) {
      let carContent = '';
      if (cell.contractName) {
        if (cell.contractName.length >= 30) {
          carContent = cell.contractName.substring(0, 30) + '...';
        } else {
          carContent = cell.contractName;
        }
      }
      return carContent;
    },
  },
  // {
  //   title: '产品名称',
  //   index: 'productName',
  //   className: 'text-center',
  //   width: '10%',
  //   format: function(cell: any, row: any) {
  //     let carContent = '';
  //     if(cell.productName){
  //       if(cell.productName.length >= 30){
  //           carContent = cell.productName.substring(0,30) + '...';
  //       }else {
  //           carContent = cell.productName;
  //       }
  //     }
  //     return carContent;
  //   }

  // },

  // {
  //   title: '产品功能',
  //   index: 'productFunctions',
  //   className: 'text-center',
  //   width: '10%',
  //   format: function(cell: any, row: any) {
  //     let carContent = '';
  //     if(cell.productFunctions){
  //       if(cell.productFunctions.length >= 30){
  //           carContent = cell.productFunctions.substring(0,30) + '...';
  //       }else {
  //           carContent = cell.productFunctions;
  //       }
  //     }
  //     return carContent;
  //   }
  // },
  // {
  //   title: '合同金额',
  //   type:'number',
  //   index: 'contractAmount',
  //   className: 'text-center',
  //   width: '10%',

  // },
  {
    title: '合同甲方',
    index: 'customerName',
    className: 'text-center',
    width: '10%',
  },
  // {
  //   title: '甲方联系电话',
  //   index: 'customerTel',
  //   className: 'text-center',
  //   width: '10%',

  // },
  {
    title: '合同乙方',
    index: 'userName',
    className: 'text-center',
    width: '10%',
  },
  // {
  //   title: '乙方联系电话',
  //   index: 'mainTelphone',
  //   className: 'text-center',
  //   width: '10%',

  // },

  {
    title: '审核状态',
    index: 'verifyStatus',
    type: 'tag',
    tag: {
      0: { text: '待审核', color: 'orange' },
      1: { text: '审核通过', color: 'green' },
      2: { text: '审核不通过', color: 'red' },
    },
    className: 'text-center',
    width: '8%',
  },
  {
    title: 'USBKey状态',
    index: 'applyStatus',
    type: 'tag',
    tag: {
      0: { text: '未申请', color: 'orange' },
      1: { text: '处理中', color: 'yellow' },
      2: { text: '已生成', color: 'green' },
      3: { text: '拒绝', color: 'red' },
    },
    className: 'text-center',
    width: '8%',
  },
  // {
  //   title: 'USBKey状态',
  //   index: 'applyStatus',
  //   className: 'text-center',
  //   width: '10%',
  // },
];
