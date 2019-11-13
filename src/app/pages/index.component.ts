import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-index-page',
  template: `
  <nz-card id="myCard"><div id="img"><img [_src]="src" ></div></nz-card>
  `,
  styleUrls: ['./index.component.less'],
})
export class IndexPageComponent {
  src = '././assets/tmp/img/welcome.png';
}
