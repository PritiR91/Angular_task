import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin: boolean = true;
  loginForm!: FormGroup;
  SignupForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService,private router:Router) {

  }
  ngOnInit() {
    this.createLoginForm();
    this.createSignUpForm();
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern('^[A-Za-z ]*$')]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
  }
  createSignUpForm() {
    this.SignupForm = this.fb.group({
      company:['',[Validators.required,Validators.pattern('^[A-Za-z ]*$')]],
      username: ['',[Validators.required,Validators.pattern('^[A-Za-z ]*$')]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
  }
  loginhere(){
    this.showLogin = true;
  }
  signuphere(){
    this.showLogin = false;
  }
  login(){
    console.log(this.loginForm.value);
    const endpoint=`users?email=${this.loginForm.value.username}&&password=${this.loginForm.value.password}`;
    this.http.getdataFromServer(endpoint).subscribe((resp:any)=>{
      if(resp && resp.length > 0){
        console.log("login Successfull!");
        this.router.navigate(['/dashboard']);
      }
      else{
        console.log("Please signup first!!");
      }
    });
  }
  signup() {
    console.log("Sign Up Form", this.SignupForm.value);
    this.http.postDataToserver('users', Object.assign(this.SignupForm.value,{'select':false})).subscribe(
      (response: any) => {
        if (response && this.SignupForm.touched) {
          
          this.SignupForm.reset();
          alert("Signup successful!");
         
        }
        else {
          alert("try again!");
        }
        this.SignupForm.reset();
      },
      (err: any) => {
        alert("Something went wrong, Please try after sometime.");
        this.SignupForm.reset();
      });
  }
}
