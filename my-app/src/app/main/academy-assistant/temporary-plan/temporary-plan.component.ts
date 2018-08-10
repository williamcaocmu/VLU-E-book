import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
@Component({
    selector: "app-temporary-plan",
    templateUrl: "./temporary-plan.component.html",
    styleUrls: ["./temporary-plan.component.css"]
})
export class TemporaryPlanComponent implements OnInit {
    tmpCourses: any[] = [];
    constructor() {}
    activeIndex: number = 0;
    ngOnInit() {
        this.getLocalStorage();
    }

    getLocalStorage() {
        this.tmpCourses = JSON.parse(localStorage.getItem("tmp_courses"));
    }
    items: MenuItem[] = [
        {
            label: "Kế Hoạch Đào Tạo",
            command: event => {
                this.activeIndex = 0;
            }
        }
        
    ];

}
