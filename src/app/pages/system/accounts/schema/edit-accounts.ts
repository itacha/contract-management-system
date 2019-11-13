import { SFSchema, FormProperty, PropertyGroup } from '@delon/form';

export const EDIT_ACCOUNTS_SCHEMA: SFSchema = {
  properties: {
    loginName: {
      type: 'string',
      title: '登录名',
      ui: {
        placeholder: '请输入登录名',
        grid: {
          span: 12,
        },
      },
      maxLength: 20,
    },
    userName: {
      type: 'string',
      title: '姓名',
      ui: {
        placeholder: '输入姓名',
        grid: {
          span: 12,
        },
      },
      maxLength: 20,
    },
    sex: {
      type: 'string',
      title: '性别',
      enum: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }],
      ui: {
        grid: {
          span: 12,
        },
        widget: 'select',
      },
      default: 'male',
    },
    mainTelphone: {
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
          return /^1[34578]\d{9}$/.test(value)
            ? []
            : [{ keyword: 'telPhone', message: '请输入正确的11位手机号' }];
        },
      },
      maxLength: 11,
    },
    roleList:{
      type:"string",
      title:"角色",
      ui:{
        grid:{
          span:24
        },
        widget:"checkbox",
        asynData:() =>  this.accSer.findMenuCheckBoxList()
      }
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
  required: ['loginName', 'userName', 'passWord', 'sex'],
  ui: {
    spanLabelFixed: 100,
    grid: {
      span: 24,
    },
  },
};
