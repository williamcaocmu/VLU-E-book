import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: "app-class-management-detail",
    templateUrl: "./class-management-detail.component.html",
    styleUrls: ["./class-management-detail.component.css"]
})
export class ClassManagementDetailComponent implements OnInit {
    selectedStatus: any;
    selectedClass:any;
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
    selectedDate:any;

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
                        this.student = res;
                        this.student.student_id = res['StudentId'];
                        this.selectedStatus = res["Status"] == 1 ? true : false;
                        this.getAllGrades();
                        
                    })
                    .catch(err => {
                        this.alert.error(err);
                    });
            }
        });
    }

    updateStudent() {
        this.student.Status = this.selectedStatus == true ? 1 : 0;
        this.student.GradeId = this.selectedGrade ;
        console.log(this.student.Dob);
        // this.assistantService
        //     .update(this.student)
        //     .then(() => this.alert.success("Cập Nhật Thành Công"))
        //     .catch(err => {
        //         this.alert.error(`Lỗi ${err}`);
        //         console.log(err);
        //     });
    }

    getAllGrades(){
      this.assistantService.getListGrades().then((res: any[]) => {
        this.allGrades = res;
        console.log(this.allGrades);
      }).catch((e) => {
        console.log(e)
      })
    }

    onchange(e){
        this.allClasses = e.Class;
        console.log(this.allClasses);
    }
}
