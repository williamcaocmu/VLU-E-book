import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../services/api.service';



@Injectable()
export class AccountService {

	constructor(private apiService: ApiService, private cookieService: CookieService) { }

	getList() {
		return new Promise((resolve, reject) => {
			this.apiService.get("admin/getallaccounts")
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	}

	add(data: any) {
		return new Promise((resolve, reject) => {
			this.apiService.post("admin/addaccount", data)
				.then(res => {
					resolve(res);
				})
				.catch(
					err => {
						reject(err);
					}
				)
		})
	}

	getAccount(id: any) {
		return new Promise((resolve, reject) => {
			this.apiService.get(`admin/getaccount/${id}`)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	}

	updateAccount(data: any) {
		return new Promise((resolve, reject) => {
			this.apiService.post('admin/updateaccount', data)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	}

}
