import { Component, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { SidebarService } from './sidebar.service';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { PassWordEditComponent } from './password.edit.component';
import { Router } from '@angular/router';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    public sidebarService:SidebarService,
    public modal: ShowModalService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  //跳转修改页面
  gotoUpdatePassWord(){
    this.modal
    .creatStaticModal(
      PassWordEditComponent,
      {item:{}},'sm',
      {
        nzTitle: `修改${this.settings.user.name}的密码`,
      },
    )
    .subscribe(res => {
      if (res) {
       //修改成功跳转登录页面
       const id = this.msgSrv.loading('修改密码成功，正在进入重新登录页面……', { nzDuration: 0 }).messageId;
       setTimeout(_ => {
         this.msgSrv.remove(id);
         this.logout();
       }, 2000);
      }
    });
}
//退出登录
logout() {
  this.tokenService.clear();
  this.router.navigateByUrl(this.tokenService.login_url);
}
}
