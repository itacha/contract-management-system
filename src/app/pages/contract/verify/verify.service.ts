import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import { ContractDetial } from '../list/interface';


@Injectable()
export class VerifyService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }
  //获取待审核合同信息
  getVerifyContractList(param) {
    // param.verifyStatus = '0';
    return this.client.get(this.apiUrl.BusContract.getContractList,param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取待审合同列表', color: 'grey' },
          true,
        );
      }),
    );
  }

  //审核合同信息
  verifyContract(param:ContractDetial){
    return this.client.post(this.apiUrl.BusContract.verifyContract,{contractId:param.contractId,verifyStatus:param.verifyStatus,auditOpinion:param.auditOpinion} ).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '审核合同信息', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
  
}
