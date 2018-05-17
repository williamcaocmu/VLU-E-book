import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class MainService {

  constructor(private apiService: ApiService	) { 

  }

  getAuthorize() {
		return new Promise((resolve, reject) => {
			this.apiService.post('auth/me', {})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	}

}
