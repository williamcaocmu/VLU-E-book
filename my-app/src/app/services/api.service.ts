import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class ApiService {
	access_token: string = 'none';
	host: string = 'http://vluebook.xyz/api/';

	constructor(private http: Http, private router: Router, private cookieService: CookieService) {
		this.access_token = this.cookieService.check('cookie') ? this.cookieService.get('cookie') : 'none'
	}

	post(url: string, data: any) {
		return new Promise<Response>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Authorization','Bearer '+ this.access_token);
			this.http.post(this.host + url, data, { headers: headers }).toPromise()
				.then(res => {
					resolve(res.json());
				}).catch(err => {
					reject(err.json());
				});
		});
	}

	get(url: string) {
		return new Promise<Response>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Authorization','Bearer '+ this.access_token);
			this.http.get(this.host + url, { headers: headers }).toPromise()
				.then(res => {
					resolve(res.json());
				})
				.catch(err => {
					console.log(err); 
					reject(err.json());
				})
		})
	}

	delete(url: string) {
		return new Promise<Response>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Authorization','Bearer '+ this.access_token);
			this.http.delete(this.host + url, { headers: headers }).toPromise()
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					if (err.status == 401)
						this.router.navigate(['/login']);
					else {
						reject(err.json());
					}
				})
		})
	}

}
