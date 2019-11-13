import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LicenseService } from './license.service';
import { UsbkeyListService } from './usbkey-list/usbkey-list.service';
import { UsbkeyNewService } from './usbkey-new/usbkey-new.service';
import { UsbkeyNewPageComponent } from './usbkey-new/usbkey-new.component';
import { UsbkeyListPageComponent } from './usbkey-list/usbkey-list.component';
import { LicenseNewPageComponent } from './license-new/license-new.component';
import { LicenseListPageComponent } from './license-list/license-list.component';
import { LicenseNewService } from './license-new/license-new.service';
import { VerifyComponent } from './usbkey-new/Verify.component';
import { UsbkeyGenListService } from './usekey-gen/usbkey-gen-list.service';
import { UsbkeyGenListPageComponent } from './usekey-gen/usbkey-gen-list.component';
import { AuthComponent } from './usekey-gen/usbkey-gen-do.component';
import { RefuseComponent } from './usekey-gen/usbkey-gen-refuse.component';
import { USBKeyGenListDetailComponent } from './usekey-gen/usbkey-gen-list.detail.component';
import { ListService } from '../contract/list/list.service';
// import { ProductDetailComponent } from '../contract/list/product.detail.component'

const routes: Routes = [
  {
    path: 'usbkey_list',
    component: UsbkeyListPageComponent,
    data: { title: 'UsbKey授权列表' },
  },
  // {
  //     path: 'usbkey_new',
  //     component: UsbkeyNewPageComponent,
  //     data: { title: '生成UsbKey' },
  // },
  {
    path: 'license_list',
    component: LicenseListPageComponent,
    data: { title: '授权码列表' },
  },
  {
    path: 'license_new',
    component: LicenseNewPageComponent,
    data: { title: '生成授权码' },
  },
  {
    path: 'usbkey_new',
    component: UsbkeyGenListPageComponent,
    data: { title: '生成授权码' },
  },
];

const entryComponents = [
  VerifyComponent,
  AuthComponent,
  RefuseComponent,
  USBKeyGenListDetailComponent,
  // ProductDetailComponent
];

const declarations = [
  UsbkeyListPageComponent,
  UsbkeyNewPageComponent,
  LicenseListPageComponent,
  LicenseNewPageComponent,
  UsbkeyGenListPageComponent,
];

const providers = [
  LicenseService,
  UsbkeyNewService,
  UsbkeyListService,
  LicenseNewService,
  UsbkeyGenListService,
  ListService,
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...declarations, ...entryComponents],
  exports: [
    RouterModule,
    // ...Components
  ],
  providers: [...providers],
  entryComponents: [...entryComponents],
})
export class LicenseModule {}
