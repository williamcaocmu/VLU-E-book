import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {LecturerService} from "../lecturer.service";
import {MainService} from "../../main.service";

@Component({
    selector: 'app-manage-score',
    templateUrl: './manage-score.component.html',
    styleUrls: ['./manage-score.component.css']
})
export class ManageScoreComponent implements OnInit {

    classesLecturer = [];
    classes = [];
    Id
    selectedClass: any;
    tmpAllSheets = [];
    allSheets = [];

    authId: any;
    view: boolean = false;
    import: boolean = false;


    @ViewChild('form') form: ElementRef
    display: boolean = false;
    selectedGrade: any;
    cities = [
        {Id: 1, Name: 'a'},
        {Id: 2, Name: 'b'},
        {Id: 3, Name: 'c'}
    ]

    constructor(private lecturerService: LecturerService, private mainService: MainService) {
    }

    getAllClass() {
        this.lecturerService.getAllClasses(this.authId)
            .then(res => {
                this.classesLecturer = res as any;
                this.classes = this.classesLecturer.map(x => {
                    return {
                        name: x.Name,
                        Id: x.Id
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getAuthorize() {
        this.mainService
            .getAuthorize()
            .then(res => {
                this.authId = res['Id'] as any;
                this.getAllClass();

            }).catch(err => {
            console.log(err)
        })
    }

    ngOnInit() {
        this.getAuthorize();
    }


    showDialog() {
        this.display = true;
    }

    cancel() {
        this.display = false;
        console.log(this.form['files'] = null);
    }

    myUploader(event) {
        console.log(this.selectedClass, event)
        this.lecturerService
            .importFile(event.files[0], this.selectedClass.Id)
            .then(res => {
                console.log(res)
                this.selectedClass = null;

            }).catch(err => {
            console.log(err)
        })
    }


    openPopupView(data) {
        this.view = true;
        console.log(data);
        this.lecturerService
            .getGradeByClass(data)
            .then(res => {
                this.allSheets = res as any;
                var result = Object.keys(this.allSheets).map(i =>
                    this.allSheets[i]
                );
                this.tmpAllSheets = result;
                console.log(this.tmpAllSheets)
            }).catch(err => {
            console.log(err)
        })
    }

    openImport() {
        this.import = true;
    }
}
