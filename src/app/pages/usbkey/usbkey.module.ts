import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UsbkeyService } from './usbkey.service';
import { ListPageComponent } from './list/list.component';
import { ListService } from './list/list.service';
import { InitializePageComponent } from './initialize/initialize.component';
import { InitializeService } from './initialize/initialize.service';

const routes: Routes = [
  {
    path: 'initialize',
    component: InitializePageComponent,
    data: { title: '初始化UsbKey' },
  },
  {
    path: 'list',
    component: ListPageComponent,
    data: { title: 'UsbKey列表' },
  },
];

const entryComponents = [];

const declarations = [ListPageComponent, InitializePageComponent];

const providers = [UsbkeyService, ListService, InitializeService];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...declarations, ...entryComponents],
  exports: [
    ...declarations,
    RouterModule,
    // ...Components
  ],
  providers: [...providers],
  entryComponents: [...entryComponents],
})
export class UsbkeyModule {}
