import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ShowModalService } from 'app/basic';
import { PassWordEditComponent } from '../../sidebar/password.edit.component';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzText]="'USER'" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="gotoUpdatePassWord()"><i class="anticon anticon-edit mr-sm"></i>修改密码</div>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-logout mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  `,
})
  // <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
  // <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
  // <li nz-menu-divider></li>
export class HeaderUserComponent {
  constructor(
    public modal: ShowModalService,
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
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
     this.logout();
    }
  });
}

}
