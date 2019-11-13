export interface CustomerDetial {
  customerId?: string | null;
  customerName?: string;
  customerTel?: string;
  customerDesc?: string;
  customerAdds?: string;
  verifyStatus?: string;
  remark?:string;
  [key: string]: any;
}

