import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ListPageComponent } from './list/list.component';

import { CustomService } from './custom.service';
import { VerifyPageComponent } from './verify/verify.component';
import { ListService } from './list/list.service';
import { VerifyService } from './verify/verify.service';
import { ListEditComponent } from './list/list.edit.component';
import { VerifyEditComponent } from './verify/verify.edit.component';


const routes: Routes = [
    {
        path: 'list',
        component: ListPageComponent,
        data: { title: '客户列表' },
    },
    {
        path: 'verify',
        component: VerifyPageComponent,
        data: { title: '客户审核' },
    }
];

const entryComponents = [
    ListEditComponent,
    VerifyEditComponent
];

const declarations = [
    ListPageComponent,
    VerifyPageComponent
];

const providers = [
    CustomService,
    ListService,
    VerifyService
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
export class CustomModule { }
