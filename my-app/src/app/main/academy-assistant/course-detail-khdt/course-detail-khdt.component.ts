import {Component, OnInit} from '@angular/core';
import {AcademyAssistantService} from "../academy-assistant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {Message} from "primeng/components/common/api";
import {AlertService} from "../../../services/alert.service";

@Component({
    selector: 'app-course-detail-khdt',
    templateUrl: './course-detail-khdt.component.html',
    styleUrls: ['./course-detail-khdt.component.css']
})
export class CourseDetailKhdtComponent implements OnInit {

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
        HK: "",
        DA: ""
    };

    constructor(private assistantService: AcademyAssistantService,
                private activatedRouted: ActivatedRoute,
                private alert: AlertService,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRouted.params.subscribe(params => {
            this.Id = +params["id"];
            if (this.Id > 0) {
                this.assistantService
                    .getCourseInPlan(this.Id)
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
                        this.alert.error(err);
                    });
            }
        });
    }

    updateCourse() {
        console.log((this.course))
        this.assistantService
            .updateCoursePlan(this.course)
            .then(() => {
                this.router.navigate(['/main/assistant/view-education-plan']);
                this.alert.success("Cập Nhật Thành Công");
            })
            .catch(err => {
                this.alert.error(err);
            });
    }

}
