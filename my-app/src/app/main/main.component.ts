import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api.service";
import { LoginService } from "../login/login.service";
import { MainService } from "./main.service";
import { MenuItem } from "primeng/api";
import { AlertService } from "../services/alert.service";


@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
    items: MenuItem[] = [];
    currentRole: any;
    navConfig = {
        tabAccount: ["admin"],
        tabLecturer: ["lecturer"],
        tabStudent: ["student/parent"],
        tabAssistant: ["assistant"],
        tabBoard: ["board"],
        tabOfficer: ["officer"]
    };

    auth = {
        Id: "",
        StaffId: "",
        Email: "",
        OtherEmail: "",
        Phone1: "",
        Phone2: "",
        Status: "",
        Name: "",
        Role: ""
    };

    setConfigAuthor(arrTab: any[]) {
        if (this.currentRole) {
            return arrTab.indexOf(this.currentRole) > -1;
        }
    }

    constructor(
        private cookieService: CookieService,
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private apiService: ApiService,
        private loginService: LoginService,
        private mainService: MainService,
        private alert: AlertService
    ) {}
    ngOnInit() {
        
        this.getAuthor();
        return new Promise((resolve, reject) => {
            resolve();
        })
            .then(res => {
                if (this.cookieService.check("cookie") == false) {
                    this.router.navigate(["/login"]);
                }
            })
            .catch(err => {
                this.router.navigate(["/login"]);
            });
    }

    logOut() {
        this.alert.confirm("Bạn có muốn đăng xuất").then(() => {
            this.router.navigate(["/login"]);
            this.cookieService.delete("cookie");
            this.cookieService.deleteAll();
            this.mainService.logOut();
        });
    }

    getAuthor() {
        this.mainService
            .getAuthorize()
            .then(res => {
                this.auth = res as any;
                this.currentRole = this.auth.Role;
                let currentRole = res["Role"];
                console.log(this.auth);
                this.items.push({
                    label: this.auth.Email,
                    icon: "fa-envelope"
                });

                // if (this.currentRole == 'admin') {
                // 	this.router.navigate(['/main/account']);
                // }
                // else if (this.currentRole == 'lecturer') {
                // 	this.router.navigate(['/main/lecturer']);
                // }
                // else if (this.currentRole == 'student/parent') {
                // 	this.router.navigate(['/main/student']);
                // }
                // else if (this.currentRole == 'assistant') {
                // 	console.log("here is assistant");
                // 	this.router.navigate(['/main/assistant']);
                // }
                // else if (this.currentRole == 'officer') {
                // 	this.router.navigate(['/main/officer'])
                // }
                // else if (this.currentRole == 'board') {
                // 	this.router.navigate(['/main/dean']);
                // }
            })
            .catch(err => {
                console.log(err);
            });
    }
}
