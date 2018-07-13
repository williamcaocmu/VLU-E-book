import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import { TreeNode } from "primeng/api";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { AlertService } from "../../../services/alert.service";
import { LoadingService } from "../../../services/loading.service";
import { Message } from "primeng/components/common/api";

@Component({
    selector: "app-course-management",
    templateUrl: "./course-management.component.html",
    styleUrls: ["./course-management.component.css"]
})
export class CourseManagementComponent implements OnInit {
    classEdit = {
        Id: "",
        Name: "",
        GradeId: ""
    };
    editClassInfo: boolean = false;
    selectedClassInfo: any;
    selectedGradeInfo: any;
    display: boolean = false;
    msgs: Message[] = [];
    isSendFile: boolean = false;
    isImport: boolean;
    dataResponseImportFile: any[];
    messageImportFile: any;
    nameFileImport: any;
    msgsGrade: Message[] = [];
    msgsClass: Message[] = [];
    displayFile: boolean = false;
    grade: any = {
        Name: ""
    };

    class: any = {
        Name: "",
        GradeId: ""
    };

    isCreateGrade: boolean = false;
    isCreateClass: boolean = false;
    selectedGrade: any;

    items: MenuItem[] = [{ label: "Quản lí môn học" },{ label: "Thông tin môn học" }];
    gradeOptions: any[];
    allGrade: any[];

    Khoa = [];

    LopInkHoa = [];

    data: any;
    options: any;

    constructor(
        private assistantService: AcademyAssistantService,
        private alertService: AlertService,
        private loading: LoadingService
    ) {}

    ngOnInit() {
        // this.data = {
        //   labels: ["A"],
        //   datasets: [
        //     {
        //       data: [300],
        //       backgroundColor: ["#FF6384"],
        //       hoverBackgroundColor: ["#FF6384"]
        //     }
        //   ]
        // };
        // this.options = {
        //   rotation: 1.0 * Math.PI,
        //   circumference: Math.PI,
        //   legend: { position: "top" },
        //   title: { display: true, text: "Graphics" },
        //   animation: { animateScale: true, animateRotate: true }
        // };

        // let allKhoa = this.cars1.map(x => x.Khoa);
        // this.Khoa = allKhoa.filter(
        //   (value, index, array) => array.indexOf(value) == index
        // );
        // this.Khoa = this.Khoa.map(x => {
        //   return { name: x };
        // });

        // this.LopInkHoa = this.cars1.filter(x => x.Khoa == this.Khoa[0]);
        // console.log(this.LopInkHoa);

        this.getAllGrade();
    }

    getAllGrade() {
        this.loading.start();
        this.assistantService
            .getListGrades()
            .then(res => {
                this.loading.stop();
                this.allGrade = res as any;
                console.log(this.allGrade);
            })
            .catch(err => {
                this.alertService.error(err);
            });
    }

    changeStateGrade() {
        this.isCreateGrade = !this.isCreateGrade;
    }

    changeStateClass() {
        this.isCreateClass = !this.isCreateClass;
    }

    addGrade() {
        this.msgsGrade = [];
        this.assistantService
            .addGrade(this.grade)
            .then(() => {
                this.alertService.success("Successfully");
                this.grade.Name = "";
                this.getAllGrade();
            })
            .catch(err => {
                if (err.errors.Name) {
                    this.msgsGrade.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Name)
                    });
                }
            });
    }

    addClass() {
        this.msgsClass = [];
        this.class.GradeId = this.selectedGrade["Id"];
        this.assistantService
            .addClass(this.class)
            .then(() => {
                this.alertService.success("Successfully");
                this.class.Name = "";
                this.getAllGrade();
            })
            .catch(err => {
                if (err.errors.Name) {
                    this.msgsClass.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Name)
                    });
                }
                console.log(err.errors);
            });
    }

    showDialogFile() {
        this.displayFile = true;
    }

    myUploader(event) {
        this.assistantService
            .postFile(event.files[0])
            .then(res => {
                this.dataResponseImportFile = res["Students"] as any;
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

    showDialog(grade, z) {
        this.display = true;
        console.log(grade, z);
        this.selectedGradeInfo = grade;
        this.selectedClassInfo = z;
    }

    updateClass() {
        this.classEdit.Id = this.selectedClassInfo.Id;
        if (!this.classEdit.GradeId) {
            this.classEdit.GradeId = this.selectedGradeInfo.Id;
        }

        console.log(this.classEdit.GradeId);
        this.assistantService
            .updateClass(this.classEdit)
            .then(res => {
                this.alertService.success(res);
            })
            .catch(err => {
                console.log(err.errors.Name);
                this.alertService.error(JSON.stringify(err.errors.Name));
            });
    }
    changeGradeEdit(e) {
        this.classEdit.GradeId = e.Id;
    }
}
