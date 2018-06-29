import { Component, OnInit, AfterViewInit } from "@angular/core";
import { LoginService } from "./login.service";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { WOW } from "wowjs/dist/wow.min";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
    isLogin: boolean;
    email: string;
    password: string;

    hasError: boolean = false;

    constructor(
        private loginService: LoginService,
        private alertService: AlertService,
        private router: Router,
        private cookieService: CookieService
    ) {
        // if(this.cookieService.check('cookie') == true){
        //   this.router.navigate(['/main']);
        // }
    }

    ngOnInit() {
        if (this.cookieService.check("cookie")) {
            this.router.navigate(["/main"]);
        }
    }

    ngAfterViewInit() {
        new WOW().init();
    }

    login() {
        this.loginService
            .login(this.email, this.password)
            .then(res => {
                this.router.navigate(["/main"]);
            })
            .catch(err => {
                console.log(err);
                this.hasError = true;
                this.router.navigate(["/login"]);
                this.cookieService.deleteAll();
            });
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            this.login();
        }
    }
}
