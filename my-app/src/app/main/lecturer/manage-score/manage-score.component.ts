import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { LecturerService } from "../lecturer.service";
import { MainService } from "../../main.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: "app-manage-score",
    templateUrl: "./manage-score.component.html",
    styleUrls: ["./manage-score.component.css"]
})
export class ManageScoreComponent implements OnInit {
    classesLecturer = [];
    classes = [];
    selectedClass: any;
    tmpAllSheets = [];
    allSheets = [];
    headers = [];

    studentsInClass = [];

    authId: any;
    view: boolean = false;
    import: boolean = false;
    viewStudent: boolean = false;
    idExport: any;

    @ViewChild("form")
    form: ElementRef;
    display: boolean = false;
    selectedGrade: any;

    constructor(
        private lecturerService: LecturerService,
        private mainService: MainService,
        private alert: AlertService
    ) {}

    getAllClass() {
        this.lecturerService
            .getAllClasses(this.authId)
            .then(res => {
                this.classesLecturer = res as any;
                this.classes = this.classesLecturer.map(x => {
                    return {
                        name: x.Name,
                        Id: x.Id
                    };
                });
            })
            .catch(err => {
                this.alert.error("Lỗi");
            });
    }

    getAuthorize() {
        this.mainService
            .getAuthorize()
            .then(res => {
                this.authId = res["Id"] as any;
                this.getAllClass();
            })
            .catch(err => {
                this.alert.error("Lỗi");
            });
    }

    ngOnInit() {
        this.getAuthorize();
    }

    showDialog() {
        this.display = true;
    }

    cancel() {
        this.display = false;
        console.log((this.form["files"] = null));
    }

    myUploader(event) {
        console.log(this.selectedClass, event);
        this.lecturerService
            .importFile(event.files[0], this.selectedClass.Id)
            .then(res => {
                this.selectedClass = null;
                this.alert.success("Thành Công !");
            })
            .catch(err => {
                this.alert.error("Lỗi");
            });
    }

    openPopupView(data) {
        this.view = true;
        this.idExport = data;
        this.lecturerService
            .getGradeByClass(data)
            .then(res => {
                this.allSheets = res as any;
                var result = Object.keys(this.allSheets).map(
                    i => this.allSheets[i]
                );
                this.tmpAllSheets = result;

                console.log(this.tmpAllSheets);
                if (
                    this.tmpAllSheets &&
                    this.tmpAllSheets[0].Data.length == 0
                ) {
                    this.headers.length = 0;
                }

                if (Object.keys(this.tmpAllSheets).length > 0) {
                    this.headers = Object.keys(
                        this.tmpAllSheets &&
                            this.tmpAllSheets[0] &&
                            this.tmpAllSheets[0].Data &&
                            this.tmpAllSheets[0].Data[0]
                    );
                } else {
                    this.headers.length = 0;
                }
            })
            .catch(err => {
                this.alert.error("Lỗi");
            });
    }

    openImport() {
        this.import = true;
    }

    exportFile() {
        console.log(this.idExport);
        this.lecturerService
            .exportGradeByClass(this.idExport)
            .then(res => {
                this.alert.success("Thành Công!");
            })
            .catch(err => {
                this.alert.error("Lỗi");
            });
    }

    viewStudentsInClass(id) {
        this.idExport = id;
        this.lecturerService
            .viewStudentsInClass(id)
            .then(res => {
                this.studentsInClass = res as any;
                this.studentsInClass.map(
                    student =>
                        (student.GioiTinh = student.Gender == 1 ? "Nam" : "Nữ")
                );
                console.log(res);
                this.viewStudent = true;
            })
            .catch(err => {
                this.alert.error("Lỗi");
            });
    }
}
