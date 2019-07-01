import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserI } from '../jwt/user';
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: any;
  f: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private popupService: PopupService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    email: [null, Validators.compose([Validators.required, Validators.minLength(5),
      Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

 onSubmit(userData) {
      if (this.loginForm.valid) {
        console.log(userData.email);
        const u: UserI = {
          email: userData.email,
          password: userData.password,
        };
        this.authService.login(u).subscribe((res) => {
          if (res.newToken === null) {
            console.log('hij komt hier ook hoor');
            this.Popup('Error', 'danger', res.message);
          } else {
          const title = 'Success';
          this.Popup('Success!', 'success', 'Your logging was succesfull!');
          this.router.navigateByUrl('/map');
        }},
        (err) => {
          console.log(err);
          this.Popup('Error', 'danger', err.error.message);
        }
          );
        } else {
        alert('User form is not valid!!');
      }
  }
  Popup(title: string, type: string, msg: string) {
    this.popupService.create(
      title, // title
      type, // type
      3500, // time
      msg // body
      );
  }

  getUrl() {
    return 'url(\'../Project.png\')';
  }
}
