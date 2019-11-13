import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ListPageComponent } from './list/list.component';

import { ContractService } from './contract.service';
import { VerifyPageComponent } from './verify/verify.component';
import { VerifyService } from './verify/verify.service';
import { ListService } from './list/list.service';
import { ListEditComponent } from './list/list.edit.component';
import { VerifyEditComponent } from './verify/verify.edit.component';
import { ListInfoEditComponent } from './list/list.info.edit.component';
import { ListSnapEditComponent } from './list/list.snap.edit.component';
import { ListSnapEditDetailComponent } from './list/list.snap.edit.component.detail';
import { ListInfoEditDetailComponent } from './list/list.info.edit.component.detail';
import { ListMemberlinkEditComponent } from './list/list.memberlink.edit.component';
import { ListMemberlinkEditDetailComponent } from './list/list.memberlink.edit.component.detail';
import { ListDetailComponent } from './list/list.detail.component';
import { ProductDetailComponent } from './list/product.detail.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPageComponent,
    data: { title: '合同列表' },
  },
  {
    path: 'verify',
    component: VerifyPageComponent,
    data: { title: '合同审核' },
  },
];

const entryComponents = [
  ListEditComponent,
  VerifyEditComponent,
  ListInfoEditComponent,
  ListSnapEditComponent,
  ListSnapEditDetailComponent,
  ListInfoEditDetailComponent,
  ListMemberlinkEditComponent,
  ListMemberlinkEditDetailComponent,
  ListDetailComponent,
  ProductDetailComponent,
];

const declarations = [ListPageComponent, VerifyPageComponent];

const providers = [ContractService, VerifyService, ListService];
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
export class ContractModule {}
