import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiService {
    access_token: string = "none";
    host: string ="http://cntttest.vanlanguni.edu.vn:8080/K20T2/VLU/public/api/";
    // host: string = "http://125.234.238.137:8080/K20T2/VLU/public/api/";
    // host: string = "http://10.11.27.125:8080/K20T2/VLU/public/api/";
    // host: string = "http://localhost:8000/api/";

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
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
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
        return new Promise((resolve, reject) => {
            let fileList: FileList = event;
            let headers = new Headers();
            headers.append("Authorization", "Bearer " + this.access_token);
            this.http
                .post(this.host + url, { File: event }, { headers: headers })
                .toPromise()
                .then(res => {
                    resolve(res.json());
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    postFile(event, url) {
        return new Promise<Response>((resolve, reject) => {
            console.log(event);
            let headers = new Headers();
            let frmData: FormData = new FormData();
            frmData.append("File", event, event.name);
            headers.append("Accept", "application/json");
            headers.append("Authorization", "Bearer " + this.access_token);
            console.log("File", event);
            // console.log("Form data", frmData);
            this.http
                .post(this.host + url, frmData, { headers: headers })
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

    getWord(url: string) {
        return new Promise<Response>((resolve, reject) => {
            let headers = new Headers();
            headers.append("Authorization", "Bearer " + this.access_token);
            this.http
                .get(this.host + url, { headers: headers })
                .toPromise()
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
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
