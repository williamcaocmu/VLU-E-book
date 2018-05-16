import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';


@Injectable()
export class LoginService {

	constructor(private cookieService: CookieService, private apiService: ApiService) {

	}

	login(Email: string, Password: string) {
		return new Promise((resolve, reject) => {
			this.apiService.post('auth/login', {
				Email: Email,
				Password: Password
			}).then(res => {
				this.apiService.access_token = res['access_token'];
				this.cookieService.set('cookie', this.apiService.access_token);
				resolve(res);
			}).catch(err => {
				console.log(err);
				reject(err);
			})
		})
	}

	 getAuthorize() {
		return new Promise((resolve, reject) => {
			this.apiService.post('auth/me', {})
				.then(res => {
					resolve(res)
				})
				.catch(err => {
					reject(err);
				})
		})
	}

	getRole() {
		return new Promise((resolve, reject) => {
				this.apiService.post('auth/me',{} )
					.then(res => {
						resolve(res['Role']);
					})
					.catch(err => {
						reject(err);
					})
		})
	}


}	
