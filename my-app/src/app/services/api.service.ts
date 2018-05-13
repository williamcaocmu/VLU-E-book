import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class ApiService {
	token: string = 'none';
	host: string = '';

	constructor(private http: Http, private router: Router, private cookieService: CookieService) {
		this.token = this.cookieService.check('') ? this.cookieService.get('') : 'none'
	}

	post(url: string, data: any) {
		return new Promise<Response>((resolve, reject) => {
			let headers = new Headers();
			headers.append('', this.token);
			this.http.post(this.host + url, data, { headers: headers }).toPromise()
				.then(res => {
					if (res.status === 200 || res.status == 204) {
						resolve(res);
					}
					else {
						reject('Có lỗi xảy ra');
					}
				}).catch(err => {
					if (err.status == 401)
						this.router.navigate(['/login']);
					else {
						reject(err);
					}
				})
		})
	}

	get(url: string) {
		return new Promise<Response>((resolve, reject) => {
			let headers = new Headers();
			headers.append('', this.token);
			this.http.get(this.host + url, { headers: headers }).toPromise()
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					if (err.status == 401)
						this.router.navigate(['/login']);
				})
		})
	}

	delete(url: string) {
		return new Promise<Response>((resolve, reject) => {
			let headers = new Headers();
			headers.append('', this.token);
			this.http.delete(this.host + url, { headers: headers }).toPromise()
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					if (err.status == 401)
						this.router.navigate(['/login']);
					else {
						reject(err);
					}
				})
		})
	}

}
