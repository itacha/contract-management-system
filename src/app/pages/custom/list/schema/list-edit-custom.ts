import { STColumn } from '@delon/abc';
import { FormProperty, PropertyGroup, SFSchema } from '@delon/form';

export const LIST_EDIT_CUSTOM_COLUMNS: SFSchema  = {
    properties: {
      customerName: {
        type: 'string',
        title: '客户名称',
        ui: {
          placeholder: '请输入客户名',
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
      },
      customerTel: {
        type: 'string',
        title: '联系电话',
        ui: {
          grid: {
            placeholder: '输入联系电话',
            span: 12,
          },
          validator: (
            value: any,
            formProperty: FormProperty,
            form: PropertyGroup,
          ) => {
            if(value===null||value===''){
              return [];
            }
            return (/^1[34578]\d{9}$/.test(value)|| /^0\d{2,3}-?\d{7,8}$/.test(value))
              ? []
              : [{ keyword: 'telPhone', message: '请输入正确的11位手机号或座机号' }];
          },
        },
        maxLength: 13,
      },
      customerDesc: {
        type: 'string',
        title: '客户描述',
        ui: {
          placeholder: '请输入客户描述',
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
      },
      customerAdds: {
        type: 'string',
        title: '客户地址',
        ui: {
          grid: {
            placeholder: '请输入客户地址',
            span: 12,
          }
        },
        maxLength: 100,
      },
    
      remark: {
        type: 'string',
        title: '备注',
        ui: {
          placeholder: '请输入备注',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 400,
        
      },
    },
    required: ['customerName', 'customerTel'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };
