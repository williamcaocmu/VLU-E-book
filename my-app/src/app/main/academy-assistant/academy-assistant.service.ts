import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Injectable()
export class AcademyAssistantService {

  constructor(private apiService : ApiService) { }

  getList() {
		return new Promise((resolve, reject) => {
			this.apiService.get("")
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
			this.apiService.post("", data)
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
  
  getDetail(id: any) {
		return new Promise((resolve, reject) => {
			this.apiService.get(`/${id}`)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
  }
  
  update(data: any) {
		return new Promise((resolve, reject) => {
			this.apiService.post('', data)
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				})
		})
	}

}
