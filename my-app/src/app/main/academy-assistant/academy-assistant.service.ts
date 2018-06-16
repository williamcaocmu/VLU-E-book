import { Injectable } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "selenium-webdriver/http";
import { Http } from "@angular/http";



@Injectable()
export class AcademyAssistantService {
  constructor(private apiService: ApiService, private http: Http) {}

  getList() {
    return new Promise((resolve, reject) => {
      this.apiService
        .get("assistant/getAllStudents")
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getListGrades() {
    return new Promise((resolve, reject) => {
      this.apiService
        .get("assistant/getAllGrades")
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  postFile(data){
	  return new Promise( (resolve, reject) => {
		  this.apiService.postFile(data,'assistant/handleFile')
			  .then(res => resolve(res))
			  .catch(err => reject(err))
	  })

  }

  importFile(fileName:any){
    return new Promise((resolve, reject) =>{
      this.apiService.get(`assistant/importFile/${fileName}`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }


  addGrade(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post("assistant/addGrade", data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }


  addClass(data){
    return new Promise((resolve, reject) => {
      this.apiService
        .post("assistant/addClass", data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getDetail(id: any) {
    return new Promise((resolve, reject) => {
      this.apiService
        .get(`assistant/getStudent/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  update(data: any) {
    return new Promise((resolve, reject) => {
      this.apiService
        .post("", data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
