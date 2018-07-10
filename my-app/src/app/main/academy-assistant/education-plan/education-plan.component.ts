import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-education-plan",
    templateUrl: "./education-plan.component.html",
    styleUrls: ["./education-plan.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class EducationPlanComponent implements OnInit {
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
    constructor() {}

    sourceCars: any[];

    targetCars: any[];

    ngOnInit() {
        this.allCourses;
        this.targetCars = [];
    }
}
