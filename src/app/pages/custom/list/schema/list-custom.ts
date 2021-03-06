import { STColumn } from '@delon/abc';

export const LIST_CUSTOM_COLUMNS: STColumn[] = [
  {
    title: '客户名称',
    index: 'customerName',
    className: 'text-center',
    width: '10%',
  },
  {
    title: '客户描述',
    index: 'customerDesc',
    width: '10%',
    className: 'text-center',
  },
  {
    title: '联系电话',
    index: 'customerTel',
    className: 'text-center',
    width: '11%',
  },
  {
    title: '客户地址',
    index: 'customerAdds',
    className: 'text-center',
    width: '14%',
  },
  {
    title: '审核状态',
    index: 'verifyStatus',
    // width: '130px',
    className: 'text-center',
    type: 'tag',
    tag: {
      '0':{
        text:'待审核',
        color:'orange',
      },
      '1': {
        text: '审核通过',
        color: 'green',
      },
      '2': {
        text: '审核不通过',
        color: 'red',
      },
    },
    width: '10%',
  },
  {
    title: '创建时间',
    index: 'createTime',
    className: 'text-center',
    type: 'date',
    width: '10%',
  },
  {
    title: '备注',
    index: 'remark',
    className: 'text-center',
    width: '20%',
    format: function(cell: any, row: any) {
      let carContent = '';
      if(cell.remark){
        if(cell.remark.length >= 30){
            carContent = cell.remark.substring(0,30) + '...';
        }else {
            carContent = cell.remark;
        }
      }
      return carContent;
    }
  },
];
