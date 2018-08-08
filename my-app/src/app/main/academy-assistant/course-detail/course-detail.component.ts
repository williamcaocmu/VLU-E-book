import {Component, OnInit} from "@angular/core";
import {AcademyAssistantService} from "../academy-assistant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {Message} from "primeng/components/common/api";
import {AlertService} from "../../../services/alert.service";

@Component({
    selector: "app-course-detail",
    templateUrl: "./course-detail.component.html",
    styleUrls: ["./course-detail.component.css"]
})
export class CourseDetailComponent implements OnInit {
    items: MenuItem[] = [
        {
            label: "Quản lí môn học"
        },
        {
            label: "Thông tin môn học"
        }
    ];
    msgs: Message[] = [];
    Id: number;
    course = {
        Id: "",
        MaMH: "",
        Name: "",
        TongTiet: "",
        LT: "",
        BT: "",
        TH: "",
        DVHT: "",
        HK: ""
    };

    constructor(private assistantService: AcademyAssistantService,
                private activatedRouted: ActivatedRoute,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRouted.params.subscribe(params => {
            this.Id = +params["id"];
            if (this.Id > 0) {
                this.assistantService
                    .getCourse(this.Id)
                    .then(res => {
                        this.course = res as any;
                        console.log(res);
                    })
                    .catch(err => {
                        // if (err.errors.student_id) {
                        //     this.msgs.push({
                        //         severity: "error",
                        //         summary: "LỖI : ",
                        //         detail: JSON.stringify(err.errors.student_id)
                        //     });
                        // }
                        // if (err.errors.Name) {
                        //     this.msgs.push({
                        //         severity: "error",
                        //         summary: "LỖI : ",
                        //         detail: JSON.stringify(err.errors.Name)
                        //     });
                        // }
                        // if (err.errors.Dob) {
                        //     this.msgs.push({
                        //         severity: "error",
                        //         summary: "LỖI : ",
                        //         detail: JSON.stringify(err.errors.Dob)
                        //     });
                        // }
                        console.log(err);
                        this.alertService.error("Lỗi");
                    });
            }
        });
    }

    updateCourse() {
        console.log((this.course))
        this.assistantService
            .updateCourse(this.course)
            .then(() => {
                this.router.navigate(['/main/assistant/course-management'])
                this.alertService.success("Cập Nhật Thành Công");
            })
            .catch(err => {
                console.log(err);
            });
    }
}
