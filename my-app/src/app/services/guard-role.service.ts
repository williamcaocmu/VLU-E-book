import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GuardRoleService implements CanActivate {
	currentRole: any;


	constructor(private router: Router, private loginService: LoginService) {

	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> {
		return this.loginService.getAuthorize().then((res) => {
			if (res['Role'] == route.data.allowedRole) {
				return true;
			}
			else
				{
					this.router.navigate(['/main']);
					return false;
				}
		}).catch(err => {
			return false;
		})
	}
}
