import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "../../../../../node_modules/@angular/router";
import { AcademyAssistantService } from "../academy-assistant.service";

@Component({
    selector: "app-assign-education-plan",
    templateUrl: "./assign-education-plan.component.html",
    styleUrls: ["./assign-education-plan.component.css"]
})
export class AssignEducationPlanComponent implements OnInit {
    educationPlans: any[];
    planid: number;
    nameClass = [];
    quantity: number;
    courses: any[];
    lecturers: any[];
    plan: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private assistantService: AcademyAssistantService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.planid = +params["id"];
        });
        this.getAllLecturers();
        this.getAllClassesInPlan();
    }

    getAllLecturers() {
        this.assistantService
            .getALlLecturers()
            .then(res => {
                console.log(res);
                this.lecturers = res as any;
            })
            .catch(err => {
                console.log(err);
            });
    }

    create() {
        console.log(this.quantity);
        for (let i = 0; i < this.quantity; i++) {
            this.nameClass.push({
                nameRow: `${i}`,
                CourseId: "",
                Classes: "",
                LecturerId: ""
            });
        }
        if (this.planid > 0) {
            this.assistantService
                .getAllEducationPlans()
                .then((res: any[]) => {
                    let tmp = res.filter(x => x.Id == this.planid)[0].Courses;
                    this.courses = tmp;
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
                console.log("education", this.educationPlans);
            })
            .catch(err => {
                console.log(err);
            });
    }

    clearAll() {
        this.nameClass.length = 0;
    }

    createEducationPlan() {
        this.nameClass.map(x => {
            x.CourseId = x.CourseId.Id;
            x.LecturerId = x.LecturerId.Id;
        });
        let obj = {
            AssClass: this.nameClass
        };
        console.log(obj);
        this.assistantService
            .createAssignClassInPlan(obj)
            .then(res => {
                this.nameClass.length = 0;
                this.getAllClassesInPlan();
            })
            .catch(err => {
                console.log(err);
            });
    }

    getAllClassesInPlan() {
        this.assistantService
            .getAllClassesInPlan()
            .then(res => {
                console.log("all classes in plan", res);
                this.plan = res;
            })
            .catch(err => {
                console.log(err);
            });
    }
}
