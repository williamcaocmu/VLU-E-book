import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "../../../../../node_modules/@angular/router";
import {AcademyAssistantService} from "../academy-assistant.service";

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
    Classes: "";
    CourseId: "";
    LecturerId: "";

    constructor(private activatedRoute: ActivatedRoute,
                private assistantService: AcademyAssistantService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.planid = +params["id"];
            if (this.planid > 0) {
                this.assistantService.getCourseFromEducationPlan(this.planid).then(res => {
                    console.log('get course success', res);
                    this.courses = res as any;
                }).catch(err => {
                    console.log('get course fail', err);
                })
            }
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

    createEducationPlan() {
        const CourseId = this.CourseId['Id'];
        const LecturerId = this.LecturerId['Id'];
        let data = {
            AssClass: [{
                CourseId,
                LecturerId,
                Classes: this.Classes
            }]
        }
        this.assistantService
            .createAssignClassInPlan(data)
            .then(res => {
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

    deleteCourse(id) {
        console.log(id);
        this.assistantService
            .deleteClassEducationInPlan(id)
            .then(res => {
                console.log('delete success', res)
                this.getAllClassesInPlan();
            })
            .catch(err => {
                console.log('delete fail', err);
            })
    }
}
