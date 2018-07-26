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

    getListClasses() {
        return new Promise((resolve, reject) => {
            this.apiService
                .get("assistant/getAllClasses")
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    postFile(data) {
        return new Promise((resolve, reject) => {
            this.apiService
                .postFile(data, "assistant/handleFile")
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    importFile(fileName: any) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/importFile/${fileName}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    //START COURSE
    postCourse(data) {
        let tmpData = data.GradeId;
        return new Promise((resolve, reject) => {
            this.apiService
                .postFile(data.File, `assistant/handleCourse/${tmpData}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    importCourse(fileName: any) {
        console.log("File Name", fileName);
        return new Promise((resolve, reject) => {
            this.apiService
                .get(
                    `assistant/importCourse/${fileName.name}/${
                        fileName.GradeId
                    }`
                )
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    getAllCourses() {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/getAllCourses`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    updateCourse(data) {
        return new Promise((resolve, reject) => {
            this.apiService
                .post("assistant/updateCourse", data)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getCourse(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/getCourse/${id}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    deleteCourse(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/deleteCourse/${id}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    //END COURSE

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

    addClass(data) {
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
                .post("assistant/updateStudent", data)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    updateClass(data) {
        return new Promise((resolve, reject) => {
            this.apiService
                .post("assistant/updateClass", data)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    // EDUCATION PLAN
    postEducationPlan(data) {
        return new Promise((resolve, reject) => {
            this.apiService
                .post("createEducationPlan", data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    getEducationPlan(value) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/getCourseList/${value.grade_id}/${value.hk}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    updateEducationPlan(data) {
        return new Promise((resolve, reject) => {
            this.apiService
                .post(`updateEducationPlan`, data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    getAllSemesters(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/getHKFromGradeId/${id}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    createEducationPlan(value) {
        return new Promise((resolve, reject) => {
            this.apiService
                .post(`assistant/createEducationPlan`, value)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    getAllEducationPlans() {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/getAllEducationPlans`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    exportEducationPlan(id) {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(`assistant/exportEducationPlan/${id}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    uploadFileWord(data) {
        console.log(data.File);
        return new Promise((resolve, reject) => {
            this.apiService
                .postFile(
                    data.File,
                    `assistant/importCourseWord/${data.grade_id}`
                )
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    downloadFileWord(data) {
        return new Promise((resolve, reject) => {
            this.apiService
                .getWord(`downCourseWord/${data}`)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}
