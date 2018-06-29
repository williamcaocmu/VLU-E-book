import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../account.service";
import { AlertService } from "../../../services/alert.service";
import { MenuItem } from "primeng/api";
import { Message } from "primeng/components/common/api";

@Component({
    selector: "app-account-detail",
    templateUrl: "./account-detail.component.html",
    styleUrls: ["./account-detail.component.css"]
})
export class AccountDetailComponent implements OnInit {
    err: any;
    msgs: Message[] = [];
    items: MenuItem[] = [
        { label: "Tài Khoản", routerLink: ["/main/account"] },
        { label: "Thông Tin Tài Khoản" }
    ];

    id: number;
    account = {
        StaffId: "",
        Role: "",
        Name: "",
        Email: "",
        OtherEmail: "",
        Password: "",
        Phone1: "",
        Phone2: ""
    };

    selectedStatus: boolean;
    allRoles = [
        { shortNameRole: "admin", fullNameRole: "Admin" },
        { shortNameRole: "assistant", fullNameRole: "Academy Assistant" },
        { shortNameRole: "officer", fullNameRole: "Student Service Officer" },
        { shortNameRole: "student/parent", fullNameRole: "Student" },
        { shortNameRole: "board", fullNameRole: "Falcuty Board" },
        { shortNameRole: "lecturer", fullNameRole: "Lecturer" }
    ];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = +params["id"];
            if (this.id != 0) {
                // Lấy thông tin account nếu đã có id
                this.accountService
                    .getAccount(this.id)
                    .then(res => {
                        this.account = res as any;
                        this.selectedStatus = res["Status"] == 1 ? true : false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    }

    updateAccount() {
        this.account["Status"] = this.selectedStatus == true ? 1 : 0;
        console.log(this.account["Status"]);
        this.accountService
            .updateAccount(this.account)
            .then(res => {
                this.alertService.success("Updated Successfully !");
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

    addAccount() {
        this.accountService
            .add(this.account)
            .then(res => {
                this.router.navigate(["/main/account"]);
                // console.log(res);
            })
            .catch(err => {
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
