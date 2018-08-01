import { Component, OnInit } from "@angular/core";
import { AcademyAssistantService } from "../academy-assistant.service";

@Component({
    selector: "app-manage-lecturer",
    templateUrl: "./manage-lecturer.component.html",
    styleUrls: ["./manage-lecturer.component.css"]
})
export class ManageLecturerComponent implements OnInit {
    lecturers: any[];

    constructor(private assistantService: AcademyAssistantService) {}

    ngOnInit() {
        this.assistantService
            .getAllLecturer()
            .then(res => {
                console.log(res);
                this.lecturers = res as any;
            })
            .catch(err => {
                console.log(err);
            });
    }
}
