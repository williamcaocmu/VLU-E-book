import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-temporary-plan",
    templateUrl: "./temporary-plan.component.html",
    styleUrls: ["./temporary-plan.component.css"]
})
export class TemporaryPlanComponent implements OnInit {
    tmpCourses: any[] = [];
    constructor() {}

    ngOnInit() {
        this.getLocalStorage();
    }

    getLocalStorage() {
        this.tmpCourses = JSON.parse(localStorage.getItem("tmp_courses"));
    }
}
