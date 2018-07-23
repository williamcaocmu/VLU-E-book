import { Component, OnInit } from "@angular/core";
import { AcademyAssistantService } from "../academy-assistant.service";
import { Message } from "primeng/components/common/api";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: "app-import-course",
    templateUrl: "./import-course.component.html",
    styleUrls: ["./import-course.component.css"]
})
export class ImportCourseComponent implements OnInit {
    selectedGrade: any;
    selectedCourse: any;
    allGrades: any[];
    displayDialog: boolean = false;
    displayFile: boolean = false;
    dataResponseImportFile: any[];
    isImport: boolean;
    msgs: Message[] = [];
    nameFileImport: any;
    sumCourses: number;
    allCourses = [];

    constructor(
        private assistantService: AcademyAssistantService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.loadData();
        this.getAllGrades();
    }

    showDialogFile() {
        this.displayFile = true;
    }

    myUploader(event) {
        let object = {
            File: event.files[0],
            GradeId: this.selectedGrade.Id
        };
        console.log(object);

        this.assistantService
            .postCourse(object)
            .then(res => {
                this.dataResponseImportFile = res["Students"] as any;
                this.sumCourses = res["SumCourses"] as any;
                if (res["ErrorCouses"] > 0) {
                    this.isImport = false;
                    let str;
                    res["Students"].map(x => {
                        if (x.Error) {
                            console.log(x);
                            str = `Khoá học ${x.Name} có lỗi : ${x.Error}`;
                            this.msgs.push({
                                severity: "error",
                                summary: "LỖI : ",
                                detail: str
                            });
                        }
                    });
                } else {
                    this.isImport = true;
                    this.nameFileImport = res["File"];
                }
            })
            .catch(err => {
                this.alertService.error(
                    err.message + " Vui lòng chọn lại file"
                );
            });
        this.msgs = [];
    }

    importFile() {
        let object = {
            name: this.nameFileImport,
            GradeId: this.selectedGrade.Id
        };
        this.assistantService
            .importCourse(object)
            .then(res => {
                this.alertService.success("Thêm thành công");
                this.cancelImport();
                this.loadData();
                console.log(res);
            })
            .catch(err => {
                this.alertService.error("Thêm lỗi");
            });
    }

    cancelImport() {
        this.dataResponseImportFile = null;
    }

    loadData() {
        this.assistantService
            .getAllCourses()
            .then(res => {
                this.allCourses = res as any;
                console.log("all course ", this.allCourses);
                let totalTongTiet = 0;
                this.allCourses.map(x => (totalTongTiet += x.TongTiet));
            })
            .catch(err => {
                console.log(err);
            });
    }

    selectCourse(event: Event, course: any) {
        console.log(course);
        this.selectedCourse = course;
        this.displayDialog = true;
        event.preventDefault();
    }

    deleteCourse(course) {
        this.alertService
            .confirm("Bạn có chắc muốn xoá !!!")
            .then(res => {
                this.assistantService
                    .deleteCourse(course.Id)
                    .then(res => {
                        this.alertService.success(res["message"]);
                        this.loadData();
                    })
                    .catch(err => this.alertService.error(err));
            })
            .catch(err => this.alertService.error(err));
    }

    getAllGrades() {
        this.assistantService
            .getListGrades()
            .then((res: any[]) => {
                this.allGrades = res;
                console.log("all grades ", this.allGrades);
            })
            .catch(err => this.alertService.error(err));
    }

    onChange(value) {
        console.log(value);
        this.selectedGrade = value;
    }
}
