export interface ContractDetial {
  contractId?: string | null;
  contractNum?: string;
  contractName?: string;
  contractAmount?: string;
  customerId?: string;
  userId?: string;
  verifyStatus?: string;
  applyStatus?: string;
  json?: string;
  startTime?: string;
  endTime?: string;
  productId?: string;
  periodType?: string;
  refuseReason?: string;
  remark?: string;
  infos?: ContractInfoDetial[];
  snapshots?: ContractSnapDetial[];
  links?: ContractLinkDetail[];
  userIdArry?: string[];
  [key: string]: any;
  auditOpinion?:string;
}

 export interface ContractInfoDetial {
  contractInfoId?: string | null;
  contractId?: string;
  contractInfoLable?: string;
  contractInfoValue?: string;
  remark?: string;
  [key: string]: any;
}

export interface ContractSnapDetial {
  contractSnapshotId?: string | null;
  contractDesc?: string;
  contractSnapshotCont?: string;
  contractId?: string;
  snapshotStatus?: string;
  remark?: string;
  [key: string]: any;
}

export interface ContractLinkDetail {
  contractId?: string | null;
  membersDesc?: string;
  membersName?: string;
  membersPhone?: string;
  resuresType?: string;
  remark?: string;
  [key: string]: any;
}

export interface ContractAttachmentDetail {
  attachmentId?: string | null;
  contractId?: string;
  name?: string;
  fileName?: string;
  url?: string;
  fileSize?: string;
  suffix?: string;
  [key: string]: any;
}


