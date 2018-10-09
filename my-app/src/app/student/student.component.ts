import {Component, OnInit} from '@angular/core';
import {StudentService} from "./student.service";
import {AlertService} from "../services/alert.service";

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

    mssv;
    listClasses = [];
    displayDialog = false;
    allMarks = [];
    errors ;

    constructor(private studentService: StudentService, private alert: AlertService) {
    }

    ngOnInit() {
    }

    submit() {
        this.studentService
            .getClassBySTID(this.mssv)
            .then(res => {
                    console.log(res);
                    this.listClasses = res as any
                }
            )
            .catch(err => {
                this.alert.error(err.message)
            })
    }

    selectClass(data) {
        this.displayDialog = true;
        console.log(data.Id);
        this.studentService
            .getGradeBySTID(data.Id, this.mssv)
            .then(res => {
                console.log(res)
                this.allMarks = res as any;
            }).catch(err => {
            console.log(err);
        })
    }

}
