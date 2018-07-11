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
    fixedSemesters: any[] = [
        {
            Name: "Học kì 1"
        },
        {
            Name: "Học kì 2"
        },
        {
            Name: "Học kì 3"
        }
    ];
    selectedGrade: any;
    allGrades = [];

    targetCars: any[];
    activeIndex: number = 0;

    grades = [];
    semester = [];
    allCourses = [
        {
            name: "a",
            id: 1
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 3
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "a",
            id: 1
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        },
        {
            name: "b",
            id: 2
        }
    ];

    sourceCars: any[];
    items: MenuItem[] = [
        {
            label: "Chọn khoá và lớp",
            command: event => {
                this.activeIndex = 0;
            }
        },
        {
            label: "Chọn danh sách môn học",
            command: event => {
                this.activeIndex = 1;
            }
        },
        {
            label: "Chọn học kì",
            command: event => {
                this.activeIndex = 2;
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

    onNext() {
        console.log(this.activeIndex);
        this.activeIndex++;
        if (this.activeIndex > 2) {
            this.activeIndex = 2;
        }
    }
}
