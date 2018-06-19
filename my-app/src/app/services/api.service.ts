import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Observable";



@Injectable()
export class ApiService {
  access_token: string = "none";
  host: string = "http://125.234.238.137:8080/CMU/K20T2/VLU/public/api/";

  constructor(
    private http: Http,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.access_token = this.cookieService.check("cookie")
      ? this.cookieService.get("cookie")
      : "none";
  }

  post(url: string, data: any) {
    return new Promise<Response>((resolve, reject) => {
      let headers = new Headers();
      headers.append("Authorization", "Bearer " + this.access_token);
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      console.log(data);
      this.http
        .post(this.host + url, data, { headers: headers })
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          reject(err.json());
        });
    });
  }

  fileUpload(event, url) {
	  return new Promise( (resolve, reject) => {
		let fileList: FileList = event;
		// if (fileList.length > 0) {
		//   let file: File = FileList[0];
		//   let formData: FormData = new FormData();
	
		  let headers = new Headers();
		  // headers.append("Content-Type", "multipart/form-data");
		  // headers.append("Accept", "application/json");
		  headers.append("Authorization", "Bearer " + this.access_token);
			this.http.post(this.host + url, {File: event} , {headers : headers})
			.toPromise()
			.then(
				res => {
					resolve(res.json())
				}
			).catch(err => {
				reject(err);
			})
		
		
	  })
  }

  postFile(event, url){
	return new Promise<Response>((resolve, reject) => {
		let headers = new Headers();
		// headers.append("Content-Type", "multipart/form-data");
    // headers.append("Accept", "application/json");
    let frmData: FormData = new FormData();
    frmData.append('File', event, event.name);
    //headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
		headers.append("Authorization", "Bearer " + this.access_token);
    console.log("File", event);
    console.log("Form data", frmData);
		this.http
		  .post(this.host + url,  frmData, { headers: headers })
		  .toPromise()
		  .then(res => {
        
			resolve(res.json());
		  })
		  .catch(err => {
			reject(err.json());
		  });
	  });
  }

  get(url: string) {
    return new Promise<Response>((resolve, reject) => {
      let headers = new Headers();
      headers.append("Authorization", "Bearer " + this.access_token);
      this.http
        .get(this.host + url, { headers: headers })
        .toPromise()
        .then(res => {
          resolve(res.json());
        })
        .catch(err => {
          console.log(err);
          reject(err.json());
        });
    });
  }

  delete(url: string) {
    return new Promise<Response>((resolve, reject) => {
      let headers = new Headers();
      headers.append("Authorization", "Bearer " + this.access_token);
      this.http
        .delete(this.host + url, { headers: headers })
        .toPromise()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          if (err.status == 401) this.router.navigate(["/login"]);
          else {
            reject(err.json());
          }
        });
    });
  }
}
