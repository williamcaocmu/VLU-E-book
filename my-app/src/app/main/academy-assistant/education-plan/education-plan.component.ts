import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import { AlertService } from "../../../services/alert.service";

@Component({
    selector: "app-education-plan",
    templateUrl: "./education-plan.component.html",
    styleUrls: ["./education-plan.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class EducationPlanComponent implements OnInit {
    nameSemester: any;
    selectedGrade: any;
    allGrades = [];
    targetCourses: any[] = [];
    activeIndex: number = 0;
    selectedSemester: any;
    grades = [];
    selectedApplySemester: any;
    applySemester = [
        {
            id: 1,
            name: "Học kì 1"
        },
        {
            id: 2,
            name: "Học kì 2"
        },
        {
            id: 3,
            name: "Học kì 3"
        }
    ];
    allSemesters = [];
    allCourses = [];

    sourceCars: any[];
    items: MenuItem[] = [
        {
            label: "Chọn danh sách môn học",
            command: event => {
                this.activeIndex = 0;
            }
        },
        {
            label: "Tạo kế hoạch đào tạo",
            command: event => {
                this.activeIndex = 1;
            }
        }
    ];

    constructor(
        private assistantService: AcademyAssistantService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.getAllGrades();
    }

    getAllGrades() {
        this.assistantService
            .getListGrades()
            .then(res => {
                this.allGrades = res as any;
                console.log("all grades", this.allGrades);
            })
            .catch(err => {
                this.alertService.error(err);
            });
    }

    createEducationPlan() {
        let courses = [];
        this.targetCourses.map(c => {
            courses.push({
                CourseId: c.Id
            });
        });
        let obj = {
            Year: this.nameSemester,
            HK: this.selectedApplySemester.id,
            List: []
        };
        obj.List = courses;
        console.log(obj);
        this.assistantService
            .createEducationPlan(obj)
            .then(res => {
                this.alertService.success(res);
            })
            .catch(err => {
                this.alertService.error(err.message);
            });
    }

    onChangeGrades(value) {
        this.assistantService
            .getAllSemesters(value.Id)
            .then((res: any[]) => {
                this.allSemesters = res;
            })
            .catch(err => {
                console.log(err);
            });
    }

    onChangeSemester(value) {
        const obj = {
            hk: value.Name,
            grade_id: this.selectedGrade.Id
        };
        console.log(obj);
        this.assistantService
            .getEducationPlan(obj)
            .then(res => {
                console.log(res);
                this.allCourses = res as any;
            })
            .catch(err => {
                console.log(err);
            });
    }

    
}
