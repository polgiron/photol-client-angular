import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TokenPayload } from 'src/app/models/auth.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { fadeAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit {
  displayRegister: boolean = false;
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  passwordRepeat: string = '';
  errorServer: string;
  errorPassword: boolean;
  errorEmail: boolean;

  get disabled() {
    if (this.displayRegister) {
      return this.credentials.email == '' || this.credentials.password == '' || this.errorServer || this.errorPassword || this.passwordRepeat == '' || this.errorEmail;
    } else {
      return this.credentials.email == '' || this.credentials.password == '' || this.errorServer || this.errorEmail;
    }
  }

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  switchToRegister(value: boolean) {
    this.displayRegister = value;
    // this.credentials.email = '';
    this.credentials.password = '';
    this.passwordRepeat = '';
    this.errorServer = null;
    this.errorPassword = null;
    this.ref.markForCheck();
  }

  onSubmit() {
    if (this.displayRegister) {
      this.auth.register(this.credentials).then(() => {
        this.router.navigateByUrl('/');
      }, err => {
        console.error(err);
      });
    } else {
      this.auth.login(this.credentials).then(() => {
        this.router.navigateByUrl('/');
      }, error => {
        // console.error(error);
        if (error.status == 401) {
          this.errorServer = 'Email or password wrong';
          this.ref.markForCheck();
        } else {
          this.errorServer = 'Error';
        }
        this.ref.markForCheck();
      });
    }
  }

  async onKeyUp() {
    this.errorServer = null;
    this.errorEmail = false;

    if (this.credentials.email.length) {
      if (this.validateEmail(this.credentials.email)) {
        if (this.displayRegister) {
          const user = await this.userService.getByEmail(this.credentials.email);
          // console.log(user);
          if (user) {
            this.errorServer = 'Email already exists';
          } else {
            this.errorServer = null;
          }
          this.ref.markForCheck();
        }
      } else {
        this.errorEmail = true;
      }
    }

    this.ref.markForCheck();
  }

  onKeyUpPassword() {
    this.errorServer = null;

    if (this.credentials.password != '' && this.passwordRepeat != '') {
      this.errorPassword = this.credentials.password != this.passwordRepeat;
    } else {
      this.errorPassword = null;
    }

    this.ref.markForCheck();
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
