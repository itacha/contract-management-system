import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Md5 } from 'ts-md5/dist/md5';
import { AppAuthService, CommDataService, ApiResToComponent } from 'app/basic';


@Component({
  selector: 'app-user-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less'],
})
export class UserLockComponent {
  f: FormGroup;
  _loading = false;
  constructor(fb: FormBuilder,
    private auth: AppAuthService,
    public msg: NzMessageService,
    private CommData: CommDataService,
    private router: Router) {
    this.f = fb.group({
      password: [null, Validators.required]
    });
    this.CommData.isLockCcreen = true;
  }

  get password() { return this.f.controls.password; }

  submit() {
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
    }
    if (this.f.valid) {
      this._loading = true;
      const body = {
        passWord: Md5.hashStr(this.password.value).toString()
      };
      this.auth.verifyUserPassWord(body).subscribe(
        (response: ApiResToComponent) => {
          this._loading = false;
          if (response.isComplete && response.items.isPassWdRight) this.unLockScreen();
        }
      );
    }
  }

  // 确认密码后解锁屏幕
  unLockScreen() {
    this.msg.success('解锁成功！', { nzDuration: 2500 });
    // 关闭路由限制
    this.CommData.isLockCcreen = false;
    // 跳转路由
    this.router.navigate([this.CommData.redirectUrl]);
  }
}
