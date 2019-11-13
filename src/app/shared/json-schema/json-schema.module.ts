import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DelonFormModule, WidgetRegistry } from '@delon/form';

import { TinymceWidget } from '@shared/json-schema/widgets/tinymce/tinymce.widget';
import { UeditorWidget } from '@shared/json-schema/widgets/ueditor/ueditor.widget';
import { SearchWidgetComponent } from '@shared/json-schema/widgets/search/search.widget';
import { DictWidgetComponent } from '@shared/json-schema/widgets/dict/dict.widget';
import { TreeWidgetComponent } from '@shared/json-schema/widgets/tree/search.widget';
import { ChoicesWidgetComponent } from '@shared/json-schema/widgets/choices/choices.widget';
import { ImageWidgetComponent } from '@shared/json-schema/widgets/image/image.widget';
import { AvatarWidgetComponent } from '@shared/json-schema/widgets/avatar/avatar.widget';
import { TabsWidgetComponent } from '@shared/json-schema/widgets/tabs/tabs.widget';
import { TextareaWidgetComponent } from '@shared/json-schema/widgets/textarea/textarea.widget';


export const SCHEMA_THIRDS_COMPONENTS = [
  TinymceWidget,
  UeditorWidget,
  SearchWidgetComponent,
  DictWidgetComponent,
  TreeWidgetComponent,
  ChoicesWidgetComponent,
  ImageWidgetComponent,
  AvatarWidgetComponent,
  TabsWidgetComponent,
  TextareaWidgetComponent,
];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  entryComponents: SCHEMA_THIRDS_COMPONENTS,
  imports: [SharedModule, DelonFormModule.forRoot()],
  exports: [...SCHEMA_THIRDS_COMPONENTS],
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register(TinymceWidget.KEY, TinymceWidget);
    widgetRegistry.register(UeditorWidget.KEY, UeditorWidget);
    widgetRegistry.register(SearchWidgetComponent.KEY, SearchWidgetComponent);
    widgetRegistry.register(DictWidgetComponent.KEY, DictWidgetComponent);
    widgetRegistry.register(TreeWidgetComponent.KEY, TreeWidgetComponent);
    widgetRegistry.register(ChoicesWidgetComponent.KEY, ChoicesWidgetComponent);
    widgetRegistry.register(ImageWidgetComponent.KEY, ImageWidgetComponent);
    widgetRegistry.register(AvatarWidgetComponent.KEY, AvatarWidgetComponent);
    widgetRegistry.register(TabsWidgetComponent.KEY, TabsWidgetComponent);
    widgetRegistry.register(
      TextareaWidgetComponent.KEY,
      TextareaWidgetComponent,
    );
  }
}
