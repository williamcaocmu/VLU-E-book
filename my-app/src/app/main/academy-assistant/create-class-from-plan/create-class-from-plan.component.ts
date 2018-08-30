import {Component, OnInit} from "@angular/core";
import {AcademyAssistantService} from "../academy-assistant.service";
import {AlertService} from "../../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "app-create-class-from-plan",
    templateUrl: "./create-class-from-plan.component.html",
    styleUrls: ["./create-class-from-plan.component.css"]
})
export class CreateClassFromPlanComponent implements OnInit {

    allGrades = [];
    selectedGrade: any;
    id: number;
    gradeId: number;
    selectedClass: any;
    allClasses: any[] = [];
    allStudents = [];
    allInClassStudents = [];
    allNotInClassStudents = [];

    constructor(private assistantService: AcademyAssistantService,
                private alertService: AlertService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = +params["id"];
            this.gradeId = +params["gradeId"];
            console.log(this.id, this.gradeId);
            this.getAllGrade();
        });
    }

    onChangeClass(value) {
        this.allInClassStudents = [];
        this.allNotInClassStudents = [];
        console.log('here',this.id, this.selectedClass.Id);
        this.assistantService
            .getAssignStudentInClassInPlan(this.id, this.selectedClass.Id)
            .then(res => {
                // console.log(res);
                this.allStudents = res as any;
                console.log(this.allStudents);
                this.allStudents.map((value, index) => {
                    if (value.InClass === "false") {
                        this.allNotInClassStudents.push(value);
                    } else {
                        this.allInClassStudents.push(value);
                    }
                });
                console.log(
                    this.allInClassStudents,
                    this.allNotInClassStudents
                );
            })
            .catch(err => {
                console.log(err);
            });
    }

    getClassesByGrade(id) {
        this.assistantService
            .getClassByGrade(id)
            .then(res => {
                console.log(res);
                this.allClasses = res as any;
            })
            .catch(err => {
                console.log(err);
            });
    }

    update() {
        // console.log(this.allInClassStudents, this.allNotInClassStudents);
        // console.log(this.selectedClass.Id);
        let Students = [];
        this.allInClassStudents.map((value, index) => {
            Students.push(value.Id);
        });
        console.log(Students);
        const obj = {
            ClassId: this.id,
            Students
        };

        console.log(obj);

        this.assistantService
            .assignStudentInClassPlan(obj)
            .then(res => {
                console.log("success", res);
                this.alertService.success('Cập Nhật Thành Công')
            })
            .catch(err => {
                console.log("fail", err);
            });
    }

    back() {
        this.router.navigate(['/main/assistant/view-education-plan'])
    }

    getAllGrade() {

        this.assistantService.getListGrades()
            .then(res => {
                console.log(res);
                this.allGrades = res as any;
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeGrade(id) {
        this.allNotInClassStudents = [];
        this.allInClassStudents = [];
        this.assistantService.getClassByGrade(id.Id)
            .then(res => {
                this.allClasses = res as any;
            }).catch(err => {
            console.log(err)
        })
    }
}
