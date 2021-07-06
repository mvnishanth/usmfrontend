import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logindetails: any;
  submitted = false;
  loader = false;
  toastmsg = '';
registerview=false;
logingview=true
registerform:FormGroup;
sucessmsg = '';
  constructor(private formBuilder: FormBuilder, public authenticationService: AuthenticateService, public router: Router) { }

  ngOnInit() {
    this.logindetails = {
      loginid: null,
      loginpassword: null
    };
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.registerform = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern(
        /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/
      ),]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"),Validators.maxLength(30)]],
      designation: ['', [Validators.required]],
      phone: ['', [Validators.required ,Validators.maxLength(10)]],
      gender:['', [Validators.required]],
    });
  }
 

  onregSubmit() {
    console.log('ttt');
    
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }

   const obj = {
      email: this.registerform.value.username,
      password:  this.registerform.value.password,
      name: this.registerform.value.name,
      Designation: this.registerform.value.designation,
      gender: this.registerform.value.gender,
      phone: this.registerform.value.phone

    };
    console.log(obj);
    
    this.authenticationService.signup(obj).subscribe((res: any) => {
      if (res.status == 200) {
      this.registerform.reset();
      this.successtoast('User added successfully');

      this.logingview=true;
      this.registerview=false;

      }else{
      this.toastmessage('email already exists');
      }
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.logindetails = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authenticationService.login(this.logindetails).subscribe((res: any) => {
      if (res.status == 200) {
        localStorage.setItem('token', res.response.token);
        localStorage.setItem('name', res.response.name);
        localStorage.setItem('Designation', res.response.Designation);
        this.router.navigate(['/dash']);

      }else{
      this.toastmessage('invalid credtionals');
      }
    });

  }
  toastmessage(msg) {
    this.toastmsg = msg;
    setTimeout(() => {
      this.toastmsg = '';
    }, 2000);
  }
successtoast(msg) {
    this.sucessmsg = msg;
    setTimeout(() => {
      this.sucessmsg = '';
    }, 2000);
  }
  regsitershow(){
    this.registerview=true
    this.logingview=false

  }
  loginshow(){
    this.registerview=false
    this.logingview=true

  }
}
