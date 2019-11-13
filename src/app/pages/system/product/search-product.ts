import { SFSchema } from '@delon/form';

export const SEARCH_PRODUCT_SCHEMA: SFSchema = {
  properties: {
    name: {
      type: 'string',
      title: '产品名称',
      ui: {
        placeholder: '产品名称',
      },
      maxLength: 20,
    },
  },
};
