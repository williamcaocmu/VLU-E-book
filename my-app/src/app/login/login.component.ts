import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean;
  email: string;
  password: string;

  hasError: boolean = false;

  constructor(private loginService: LoginService,
     private alertService: AlertService, 
     private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login() {
    console.log('this emial', this.email, this.password);
    this.loginService.login(this.email, this.password)
      .then((res) => {
          this.router.navigate(['/main/account']);
      }).catch(err => {
        this.hasError = true;
        this.router.navigate(['/login']);
        this.cookieService.deleteAll();
      })

  }

}
