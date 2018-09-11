import {Injectable} from '@angular/core';
import {ApiService} from "../services/api.service";

@Injectable()
export class StudentService {

    constructor(private apiService: ApiService) {
    }

    getClassBySTID(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`getClassBySTID/${id}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    getGradeBySTID(classId, studentId) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`getGradeBySTID/${classId}/${studentId}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }


}
