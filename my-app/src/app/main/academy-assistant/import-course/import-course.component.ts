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
    selectedCourse: any;
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
    }

    showDialogFile() {
        this.displayFile = true;
    }

    myUploader(event) {
        this.assistantService
            .postCourse(event.files[0])
            .then(res => {
                this.dataResponseImportFile = res["Students"] as any;
                this.sumCourses = res["SumCourses"] as any;
                console.log(this.dataResponseImportFile);
                if (res["ErrorCount"] > 0) {
                    this.isImport = false;
                    let str;
                    res["Students"].map(x => {
                        if (x.Error) {
                            str = `Sinh viên ${x.Student_id} có lỗi : ${
                                x.Error
                            }`;
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
        this.assistantService
            .importCourse(this.nameFileImport)
            .then(res => {
                this.alertService.success("Thêm thành công");
                this.cancelImport();
                this.loadData();
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
                console.log(this.allCourses);
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
}
