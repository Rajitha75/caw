import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  islogin = false;
  loading = false;
  iserror = false;
  errorMessage = '';

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe( params =>
      {
       if(params.error == 'notauthorized'){
          this.iserror = true;
          this.errorMessage = params.error;
       }
      }
       );
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  onSubmit(){
    this.islogin = true;
    this.iserror = false;
    if(this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.authservice.login(this.loginForm.value).subscribe(data => {
      this.loading = false;
      this.islogin = true;
this.router.navigate(['/']);
      },
      error => {
        this.loading = false;
        this.islogin = false;
        this.iserror = true;
        this.errorMessage = error.error.reason;
      })
  }

}
