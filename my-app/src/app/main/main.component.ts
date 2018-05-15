import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginService } from '../login/login.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	auth = {
		id: '',
		staffid: '',
		email: '',
		otheremail : '',
		phone1: '',
		phone2: '',
		status: '',
		name: '',
		role: ''
	}

	constructor(
		private cookieService: CookieService, 
		private location: Location, 
		private router: Router, 
		private activatedRoute: ActivatedRoute,
		private apiService : ApiService,
		private loginService: LoginService
	) { }

	ngOnInit() {
		// this.loginService.getAuthorize()
		// .then(res => {
		// 	this.auth = res as any;
		// 	console.log(res);
		// })
		// .catch(err=> {
		// 	this.router.navigate(['/login']);
		// })

		return new Promise((resolve, reject) => {
			resolve();
		}).then(res => {

			if (this.cookieService.check('cookie') == false) {
				this.router.navigate(['/login']);
			}
		}).catch(err => {
			this.router.navigate(['/login']);
		})
	}

	logOut() {
		this.cookieService.deleteAll();
		this.router.navigate(['/login']);
	}


	


}
