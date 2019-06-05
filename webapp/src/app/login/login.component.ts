import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    email: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.email, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  onSubmit(userData) {
      if(this.loginForm.valid) {
        alert('User form is valid!!');
      }
      else {
        alert('User form is not valid!!');
      }
  }

  getUrl(){
    return 'url(\'../Project.png\')';
  }
}
