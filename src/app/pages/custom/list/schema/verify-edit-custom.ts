import { STColumn } from '@delon/abc';
import { FormProperty, PropertyGroup, SFSchema } from '@delon/form';

export const VERIFY_EDIT_CUSTOM_COLUMNS: SFSchema  = 
  {
    properties: {
      customerName: {
        type: 'string',
        title: '客户名称',
        ui: {
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
        readOnly:true,
      },
      customerTel: {
        type: 'string',
        title: '联系电话',
        ui: {
          grid: {
            span: 12,
          },
        },
        maxLength: 13,
        readOnly:true,
      },
      customerDesc: {
        type: 'string',
        title: '客户描述',
        ui: {
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
        readOnly:true,
      },
      customerAdds: {
        type: 'string',
        title: '客户地址',
        ui: {
          grid: {
            span: 12,
          }
        },
        maxLength: 200,
        readOnly:true,
      },
      createName: {
        type: 'string',
        title: '创建人',
        ui: {
          grid: {
            span: 12,
          }
        },
        maxLength: 200,
        readOnly:true,
      },
      remark: {
        type: 'string',
        title: '备注',
        ui: {
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 400,
        readOnly:true,
      },
      verifyStatus:{
        type: 'string',
        title: '审核状态',
        enum: [ { label: '通过', value: '1' }, { label: '不通过', value: '2' }],
        ui: {
            'widget': 'radio',
            'styleType': 'button'
        },
      }
    },
    required: ['verifyStatus'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };
