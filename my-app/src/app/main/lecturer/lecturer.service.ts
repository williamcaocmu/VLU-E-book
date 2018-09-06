import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Http} from "@angular/http";

@Injectable()
export class LecturerService {

    constructor(private  apiService: ApiService, private  http: Http) {
    }

    getAllClasses(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`lecturer/getAllClassByLecturer/${id}`)
                .then(res => {
                    console.log(res)
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    importFile(data: any, id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .postFile(data, `lecturer/importgrade/${id}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    getGradeByClass(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`lecturer/getGradeByClass/${id}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    exportGradeByClass(id){
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`exportgradebyclass/${id}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    // getAllClassByLecturer(id) {
    //     return new Promise((resolve, reject) => {
    //         this.apiService
    //             .get(`lecturer/getAllClassByLecturer/${id}`)
    //             .then(res => {
    //                 resolve(res);
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             });
    //     });
    // }

}
