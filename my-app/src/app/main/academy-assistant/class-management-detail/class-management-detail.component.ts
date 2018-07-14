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
    selectedStatus: any;
    selectedClass: any;
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
                        this.getAllClasses();
                        this.student = res;
                        this.student.student_id = res["StudentId"];
                        this.selectedStatus = res["Status"] == 1 ? true : false;
                        this.tmpClassId = res["ClassId"];
                    })
                    .catch(err => {
                        this.alert.error(err);
                    });
            }
        });
    }

    updateStudent() {
        // console.log(this.student);

        this.student.ClassId = this.selectedClass.Id;
        console.log(this.student);
        this.msgs = [];
        this.student.Status = this.selectedStatus == true ? 1 : 0;

        this.assistantService
            .update(this.student)
            .then(() => this.alert.success("Cập Nhật Thành Công"))
            .catch(err => {
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

    getAllClasses() {
        this.assistantService
            .getListClasses()
            .then((res: any[]) => {
                this.allClasses = res;
                this.selectedClass = this.allClasses.filter(
                    x => x["Id"] == this.tmpClassId
                )[0];
            })
            .catch(e => {
                console.log(e);
            });
    }

    changeClass(event) {
        this.selectedClass = event;
        console.log(this.selectedClass);
    }
}
