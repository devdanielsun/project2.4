import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RegUserI } from '../jwt/reg-user';
import { PopupService } from '../popup/popup.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    userForm: FormGroup;
  submitted: any;
  f: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private popupService: PopupService) {
  }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
        name: [null, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]+$')])],
        lastName: [null, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]+$')])],
        email: [null,Validators.compose([Validators.required, Validators.minLength(5), Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
      });
    }

    onSubmit(userData) {
      if (userData.password === userData.confirmPassword) {

        if (this.userForm.valid) {
          const rUser: RegUserI = {
            name: userData.name,
            lastname: userData.lastName,
            email: userData.email,
            password: userData.password,
          };
          this.authService.register(rUser).subscribe(res => {
          if (res.newToken === null) {
            console.log('hij komt hier ook hoor');
            this.Popup('Error', 'danger', res.message);
          } else {
          this.Popup('Success!', 'success', 'Your registration was succesfull!');
          this.router.navigateByUrl('/map');
        }},
        (err) => {
          console.log(err);
          this.Popup('Error', 'danger', err.error.message);
        }
          );
      } else {
        this.Popup('Error', 'danger', 'Please use a longer password or use a valid email!');
      }
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
}
