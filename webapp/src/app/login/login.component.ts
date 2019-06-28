import { AuthModule } from './../auth/auth.module';
import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../jwt/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

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
        this.authService.login(u).subscribe(res => {
          this.router.navigateByUrl('/map');
        });
      } else {
        alert('User form is not valid!!');
      }
  }

  getUrl() {
    return 'url(\'../Project.png\')';
  }
}
