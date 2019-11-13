import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ListPageComponent } from './list/list.component';
import { ApplyService } from './apply.service';
import { NewService } from './new/new.service';
import { ListService } from './list/list.service';
import { NewPageComponent } from './new/new.component';


const routes: Routes = [
    {
        path: 'list',
        component: ListPageComponent,
        data: { title: '申请列表' },
    },
    {
        path: 'new',
        component: NewPageComponent,
        data: { title: '新建申请' },
    }
];

const entryComponents = [

];

const declarations = [
    ListPageComponent,
    NewPageComponent
];

const providers = [
    ApplyService,
    NewService,
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
export class ApplyModule { }
