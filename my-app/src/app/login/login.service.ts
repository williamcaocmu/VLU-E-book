import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { resolve } from 'url';
import { ApiService } from '../services/api.service';


@Injectable()
export class LoginService {

	constructor(private cookieService: CookieService, private apiService: ApiService) { }

	login(username: string, password: string) {
		return new Promise((resolve, reject) => {
			this.apiService.post('', {
				username: username,
				password: password
			})
				.then(res => {
					this.apiService.token = res.json();
					this.cookieService.set('', this.apiService.token);
					resolve(res.json());
				})
				.catch(err => {
					console.log(err.json());
					reject(err.json());
				})
		})
	}

	getAuthorize() {
        return new Promise((resolve, reject) => {
            this.apiService.get('')
                .then(res => {
                    resolve(res.json())
                })
                .catch(err => {
                    reject(err);
                })
        })
    }



}	
