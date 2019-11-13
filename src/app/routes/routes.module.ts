import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages

// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { IndexPageComponent } from '../pages/index.component';

const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  // single pages
  UserLockComponent,
  CallbackComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component,
  IndexPageComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
