import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';

// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { AuthGuard } from 'app/basic';
import { IndexPageComponent } from '../pages/index.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index', component: IndexPageComponent
        , data: { title: '订单管理系统' },
      },
      { path: 'system', redirectTo: 'system/accounts', pathMatch: 'full' },
      {
        path: 'system',
        loadChildren: './../pages/system/system.module#SystemModule',
      },
{
        path: 'usbkey',
        loadChildren: './../pages/usbkey/usbkey.module#UsbkeyModule',
      },
      {
        path: 'contract',
        loadChildren: './../pages/contract/contract.module#ContractModule',
      },
      {
        path: 'custom',
        loadChildren: './../pages/custom/custom.module#CustomModule',
      },
      {
        path: 'apply',
        loadChildren: './../pages/apply/apply.module#ApplyModule',
      },
      {
        path: 'license',
        loadChildren: './../pages/license/license.module#LicenseModule',
      }
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'system' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.enableTracing,
      useHash: environment.useHash,
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
