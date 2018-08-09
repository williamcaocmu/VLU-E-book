import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AcademyAssistantService} from "../academy-assistant.service";
import {AlertService} from "../../../services/alert.service";

@Component({
    selector: "app-view-education-plan",
    templateUrl: "./view-education-plan.component.html",
    styleUrls: ["./view-education-plan.component.css"]
})
export class ViewEducationPlanComponent implements OnInit {
    educationPlans: any[];
    allHK: any[];
    isDisplayDialog: boolean = false;
    openModel: boolean = false;
    allGrades: any[] = [];
    selectedGrade;
    planId;
    allowDownload = false;

    constructor(private assistantService: AcademyAssistantService,
                private router: Router,
                private alert: AlertService) {
    }

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
        this.openModel = true;
        this.planId = id;
        this.assistantService
            .getAllGradesByPlanId(id)
            .then(res => {
                this.allGrades = res as any;
                console.log(this.allGrades);
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChange(event) {
        this.selectedGrade = event;
    }

    downloadFile() {
        this.allowDownload = true;
    }

    createCourse() {
    }

    changePage(a) {
        this.router.navigate([
            "main",
            "assistant",
            "assign-education-plan",
            a
        ]);
    }

    deleteEducationPlan(id) {
        this.alert.confirm('Bạn có chắc muốn xoá?')
            .then(() => {
                this.assistantService
                    .deletePlan(id)
                    .then(res => {
                        this.getAllEducationPlans();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(() => {
            })

    }
}
