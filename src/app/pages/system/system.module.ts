import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RolesPageComponent } from './roles/roles.component';
import { SystemService } from './system.service';
import { AccountsPageComponent } from './accounts/accounts.component';
import { RoleEditComponent } from './roles/role.edit.component';
import { AccountEditComponent } from './accounts/account.edit.component';
import { AccountsService } from './accounts/accounts.service';
import { RolesService } from './roles/roles.service';
import { PermissionChoosePageComponent } from './roles/permission.choose.component';
import { AccountsChoosePageComponent } from './roles/accounts.choose.component';
import { logPageComponent } from './log/log.component';
import { LogsService } from './log/log.service';
import { AccountGroupEditComponent } from './accounts/account.group.edit.component';
import { ProductService } from './product/product.service';
import { ProductPageComponent } from './product/product.component';
import { ProductEditComponent } from './product/edit.component';
import { ProductUploadComponent } from './product/upload.component';
import { ProductViewComponent } from './product/view.component';
const routes: Routes = [
  {
    path: 'roles',
    component: RolesPageComponent,
    data: { domain: 'role', title: '角色管理' },
  },
  {
    path: 'log',
    component: logPageComponent,
    data: { title: '操作日志' },
  },
  {
    path: 'accounts',
    component: AccountsPageComponent,
    data: { domain: 'account', title: '用户管理' },
  },
  {
    path: 'product',
    component: ProductPageComponent,
    data: { domain: 'product', title: '产品管理' },
  },
];

const entryComponents = [
  RoleEditComponent,
  AccountEditComponent,
  PermissionChoosePageComponent,
  AccountsChoosePageComponent,
  AccountGroupEditComponent,
  ProductEditComponent,
  ProductUploadComponent,
  ProductViewComponent
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [
    RolesPageComponent,
    AccountsPageComponent,
    logPageComponent,
    ProductPageComponent,
    ...entryComponents,
  ],
  exports: [
    RouterModule,
    // ...Components
  ],
  providers: [
    SystemService,
    AccountsService,
    RolesService,
    LogsService,
    ProductService,
  ],
  entryComponents: [...entryComponents],
})
export class SystemModule {}
