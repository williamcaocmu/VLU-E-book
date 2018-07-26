import { Component, OnInit } from "@angular/core";
import { AcademyAssistantService } from "../academy-assistant.service";

@Component({
    selector: "app-view-education-plan",
    templateUrl: "./view-education-plan.component.html",
    styleUrls: ["./view-education-plan.component.css"]
})
export class ViewEducationPlanComponent implements OnInit {
    educationPlans: any[];
    allHK: any[];
    isDisplayDialog: boolean = false;
    constructor(private assistantService: AcademyAssistantService) {}

    ngOnInit() {
        this.getAllEducationPlans();
    }

    getAllEducationPlans() {
        this.assistantService
            .getAllEducationPlans()
            .then(res => {
                this.educationPlans = res as any;
                let HK;
                if (this.educationPlans.length > 0) {
                    HK = this.educationPlans[0].HK;
                    this.educationPlans[0].Courses.map(x => (x.HK = HK));
                }
                console.log(this.educationPlans);
            })
            .catch(err => {
                console.log(err);
            });
    }

    sendIdEducation(id) {
        console.log(id);
        
    }
}
