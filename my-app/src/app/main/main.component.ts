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
	currentRole: any;
	navConfig = {
		tabAccount: ['admin'],
		tabLecturer: ['lecturer'],
		tabStudent: ['student/parent'],
		tabAssistant: ['assistant'],
		tabBoard: ['board']
	}

	auth = {
		Id: '',
		StaffId: '',
		Email: '',
		OtherEmail: '',
		Phone1: '',
		Phone2: '',
		Status: '',
		Name: '',
		Role: ''
	}

	setConfigAuthor(arrTab: any[]) {
		if (this.currentRole) {
			return (arrTab.indexOf(this.currentRole) > -1);
		}

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


	// if (this.currentRole) {
	//   if (this.currentRole == 'admin') {
	//     this.router.navigate(['/main/account']);
	//   }
	//   else if (this.currentRole == 'lecturer') {
	//     this.router.navigate(['/main/lecturer']);
	//   }
	//   else if (this.currentRole == 'student/parent') {
	//     this.router.navigate(['/main/student']);
	//   }
	//   else if (this.currentRole == 'assistant') {
	//     this.router.navigate(['/main/assistant']);
	//   }
	// }

	ngOnInit() {
		this.getAuthor();
		return new Promise((resolve, reject) => {
			resolve();
		}).then(res => {

			if (this.cookieService.check('cookie') == false) {
				this.router.navigate(['/login']);
			}
			// else {
			// 	let currentRole = res['Role'];
			// 	if (currentRole == 'admin') {
			// 		this.router.navigate(['/main/account']);
			// 	}
			// 	else if (currentRole == 'lecturer') {
			// 		this.router.navigate(['/main/lecturer']);
			// 	}
			// 	else if (currentRole == 'student/parent') {
			// 		this.router.navigate(['/main/student']);
			// 	}
			// 	else if(currentRole == 'assistant'){
			// 		this.router.navigate(['/main/assistant']);
			// 	}
			// }

		}).catch(err => {
			this.router.navigate(['/login']);
		})
	}

	logOut() {
		this.cookieService.deleteAll();
		this.router.navigate(['/login']);
		this.cookieService.deleteAll();
		window.location.reload();
	}


	getAuthor() {
		this.mainService.getAuthorize()
			.then(res => {
				this.auth = res as any;
				this.currentRole = this.auth.Role;
				let currentRole = res['Role'];
				if (this.currentRole == 'admin') {
					this.router.navigate(['/main/account']);
				}
				else if (this.currentRole == 'lecturer') {
					this.router.navigate(['/main/lecturer']);
				}
				else if (this.currentRole == 'student/parent') {
					this.router.navigate(['/main/student']);
				}
				else if(this.currentRole == 'assistant'){
					this.router.navigate(['/main/assistant']);
				}
				

			})
			.catch(err => {
				console.log(err);
			})
	}





}
