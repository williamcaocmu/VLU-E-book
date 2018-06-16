import { Component, OnInit, TemplateRef, ElementRef } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AlertService } from "../../../services/alert.service";
import { AcademyAssistantService } from "../academy-assistant.service";
import { RequestOptions, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { ApiService } from "../../../services/api.service";

@Component({
    selector: "app-class-management",
    templateUrl: "./class-management.component.html",
    styleUrls: ["./class-management.component.css"]
})
export class ClassManagementComponent implements OnInit {
    isSendFile: boolean = false;
    isImport: boolean;
    dataResponseImportFile: any[];
    messageImportFile: any;
    nameFileImport: any;

    displayFile: boolean = false;
    statusImportFile: any;
    importFileExcel: boolean = false;
    allGrade: any;
    gradeOptions: any[];
    allClass: any;
    classOptions: any[];
    allStudents: any;
    filesToUpload: Array<File>;

    selectedStudent: any;
    displayDialog: boolean;
    items: MenuItem[] = [{ label: "Quản lí sinh viên" }];

    allTimeSheetData = [{ project: "a" }, { project: "b" }, { project: "c" }];
    allProjectNames1 = ["", "a", "b", "c"];
    allProjectNames2 = ["", "m", "n", "p"];

    allProjects1 = this.allProjectNames1.map(proj => {
        return { label: proj, value: proj };
    });

    allProjects2 = this.allProjectNames2.map(proj => {
        return { label: proj, value: proj };
    });

    constructor(
        private alertService: AlertService,
        private assistantService: AcademyAssistantService,
        private http: Http,
        private api: ApiService
    ) {
        this.filesToUpload = [];
    }

    ngOnInit() {
       this.loadData();
    }

    loadData(){
      this.assistantService
      .getList()
      .then(res => {
          this.allStudents = res;

          let Grades = this.allStudents.map(x => x.Grade);
          this.allGrade = Grades.filter(
              (value, index, array) => array.indexOf(value) == index
          );
          this.allGrade.unshift("");
          this.gradeOptions = this.allGrade.map(proj => {
              return { label: proj, value: proj };
          });

          let Classes = this.allStudents.map(x => x.Class);
          this.allClass = Classes.filter(
              (value, index, array) => array.indexOf(value) == index
          );
          this.allClass.unshift("");
          this.classOptions = this.allClass.map(proj => {
              return { label: proj, value: proj };
          });
      })
      .catch(err => {
          console.log(err);
      });
    }

    selectStudent(event: Event, student: any) {
        this.selectedStudent = student;
        this.displayDialog = true;
        event.preventDefault();
    }

    importFile() {
        this.assistantService
            .importFile(this.nameFileImport)
            .then(res => {
                this.alertService.success("Thêm thành công");
                this.cancelImport();
                this.loadData();
            })
            .catch(err => {
                this.alertService.error("Thêm lỗi");
            });
    }

    myUploader(event) {
        this.assistantService
            .postFile(event.files[0])
            .then(res => {
                this.dataResponseImportFile = res["Students"] as any;
                console.log(res["ErrorCount"]);
                if (res["ErrorCount"] > 0) {
                    this.isImport = false;
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
    }

    changeImportFileExcel() {
        this.importFileExcel = !this.importFileExcel;
    }

    displayStatusImportFile() {
        return (this.statusImportFile = !this.importFileExcel
            ? "Nhập File Excel"
            : "Huỷ");
    }

    showDialogFile() {
        this.displayFile = true;
    }

    cancelImport() {
        this.dataResponseImportFile = null;
    }
}
