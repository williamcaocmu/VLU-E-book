import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginService } from '../login/login.service';
import { MainService } from './main.service';


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
		otheremail: '',
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
		private apiService: ApiService,
		private loginService: LoginService,
		private mainService: MainService

	) { }

	ngOnInit() {
		this.getAuthor();
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


	getAuthor() {
		this.mainService.getAuthorize()
			.then(res => {
				this.auth = res as any;
			})
			.catch(err => {
				console.log(err);
			})
	}





}
