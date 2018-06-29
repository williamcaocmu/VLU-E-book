import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../services/alert.service";
import { Message } from "primeng/components/common/api";

@Component({
    selector: "app-class-management-detail",
    templateUrl: "./class-management-detail.component.html",
    styleUrls: ["./class-management-detail.component.css"]
})
export class ClassManagementDetailComponent implements OnInit {
    msgs: Message[] = [];
    tmpClassId: any;
    tmpGradeId: any;
    selectedStatus: any;
    selectedClass: any;
    allGrades: any[];
    selectedGrade: any;
    allClasses: any[];
    student: any = {
        Id: "",
        student_id: "",
        Name: "",
        Gender: "",
        ClassId: "",
        GradeId: "",
        Status: "",
        Dob: ""
    };
    allGenders = [
        { shortNameGender: "0", fullNameGender: "Chưa xác định" },
        { shortNameGender: "1", fullNameGender: "Nam" },
        { shortNameGender: "2", fullNameGender: "Nữ" }
    ];
    id: number;
    items: MenuItem[] = [
        {
            label: "Quản lí sinh viên"
        },
        {
            label: "Thông tin sinh viên"
        }
    ];
    selectedDate: any;

    constructor(
        private assistantService: AcademyAssistantService,
        private activatedRoute: ActivatedRoute,
        private alert: AlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = +params["id"];
            if (this.id > 0) {
                this.assistantService
                    .getDetail(this.id)
                    .then(res => {
                        this.getAllGrades();
                        this.student = res;
                        this.student.student_id = res["StudentId"];
                        this.selectedStatus = res["Status"] == 1 ? true : false;
                        this.tmpGradeId = res["GradeId"];
                        this.tmpClassId = res["ClassId"];
                    })
                    .catch(err => {
                        this.alert.error(err);
                    });
            }
        });
    }

    updateStudent() {
        this.msgs = [];
        this.student.Status = this.selectedStatus == true ? 1 : 0;
        // this.student.Gender = +this.student.Gender;
        if (
            this.selectedGrade == undefined ||
            this.selectedClass == undefined
        ) {
            this.student.GradeId = this.tmpGradeId;
            this.student.ClassId = this.tmpClassId;
        } else {
            this.student.GradeId = this.selectedGrade.Id;
            this.student.ClassId = this.selectedClass.Id;
        }
        console.log(this.student);
        this.assistantService
            .update(this.student)
            .then(() => this.alert.success("Cập Nhật Thành Công"))
            .catch(err => {
                console.log(err.errors);
                if (err.errors.student_id) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.student_id)
                    });
                }
                if (err.errors.Name) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Name)
                    });
                }
                if (err.errors.Dob) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Dob)
                    });
                }
            });
    }

    getAllGrades() {
        this.assistantService
            .getListGrades()
            .then((res: any[]) => {
                this.allGrades = res;
            })
            .catch(e => {
                console.log(e);
            });
    }

    changeGrade(e) {
        console.log(this.selectedGrade);
        this.allClasses = e.Class;
        if (this.allClasses.length > 0) {
            this.selectedClass = e.Class[0];
        }
    }
    changeClass(e) {
        if (e.length > 0) {
            this.selectedClass = e.Id;
        }
    }
}
