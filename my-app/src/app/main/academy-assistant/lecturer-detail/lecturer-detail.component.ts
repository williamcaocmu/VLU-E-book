import { Component, OnInit } from "@angular/core";
import { AcademyAssistantService } from "../academy-assistant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: "app-lecturer-detail",
    templateUrl: "./lecturer-detail.component.html",
    styleUrls: ["./lecturer-detail.component.css"]
})
export class LecturerDetailComponent implements OnInit {
    id: number;
    msgs: any;
    lecturer = {
        StaffId: "",
        Name: "",
        Email: "",
        OtherEmail: "",
        Password: "",
        Phone1: "",
        Phone2: ""
    };

    constructor(
        private assistantService: AcademyAssistantService,
        private activatedRoute: ActivatedRoute,
        private alert: AlertService,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = +params["id"];
            if (this.id != 0) {
                this.assistantService
                    .getDetailLecturer(this.id)
                    .then(res => {
                        this.lecturer = res as any;
                    })
                    .catch(err => {
                        this.alert.error(err);
                    });
            }
        });
    }

    addLecturer() {
        console.log(this.lecturer);
        this.assistantService
            .addLecturer(this.lecturer)
            .then(res => {
                this.router.navigate(["/main/assistant/manage-lecturer"]);
            })
            .catch(err => {
                this.alert.error(err);
            });
    }

    updateLecturer() {
        this.assistantService
            .updateLecturer(this.lecturer)
            .then(res => {
                this.alert.success("Thêm thành công !");
            })
            .catch(err => {
                console.log(err);
                if (err.errors.Email) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Email)
                    });
                }
                if (err.errors.Name) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Name)
                    });
                }
                if (err.errors.Password) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Password)
                    });
                }
                if (err.errors.OtherEmail) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.OtherEmail)
                    });
                }
                if (err.errors.Phone1) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Phone1)
                    });
                }
                if (err.errors.Phone2) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Phone2)
                    });
                }
                if (err.errors.Role) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.Role)
                    });
                }
                if (err.errors.StaffId) {
                    this.msgs.push({
                        severity: "error",
                        summary: "LỖI : ",
                        detail: JSON.stringify(err.errors.StaffId)
                    });
                }
            });
        this.msgs = [];
    }
}
