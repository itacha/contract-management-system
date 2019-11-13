import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiUrlDataService, CommDataService } from './comm-datas';
import { SexIdentifyPipe, StringCutPipe, TrueFalsePipe } from './comm-pipes';
import { CommBasicService } from './comm-services/basic.service';
import {
  AppAuthService,
  AppInitService,
  DataFlowService,
  ShowLogService,
  ShowModalService,
} from './comm-services';
import { AuthGuard, CanUnlockLeaveProvide } from './route-guards';

const SPECIALSERVICE = [
  ApiUrlDataService,
  AuthGuard,
  AppAuthService,
  AppInitService,
  CommDataService,
  ShowLogService,
  ShowModalService,
  CommBasicService,
  DataFlowService,
  CanUnlockLeaveProvide,
];
// 可使用的公共模块
const COMMCOMPONENT = [SexIdentifyPipe, TrueFalsePipe, StringCutPipe];

@NgModule({
  imports: [CommonModule],
  providers: [...SPECIALSERVICE],
  declarations: [...COMMCOMPONENT],
  exports: [...COMMCOMPONENT],
})
export class BasicModule {}
