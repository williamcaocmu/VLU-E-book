import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class GuardLoginService implements CanActivate {

  constructor(private router: Router, private cookieSerice: CookieService, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log("islogin",this.cookieSerice.get('cookie') != 'none');
    return true;
  }

}
