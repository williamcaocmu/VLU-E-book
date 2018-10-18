import { Component, OnInit } from "@angular/core";
import { AcademyAssistantService } from "../academy-assistant.service";
import {AlertService} from "../../../services/alert.service";

@Component({
    selector: "app-manage-lecturer",
    templateUrl: "./manage-lecturer.component.html",
    styleUrls: ["./manage-lecturer.component.css"]
})
export class ManageLecturerComponent implements OnInit {
    lecturers: any[];

    constructor(private assistantService: AcademyAssistantService, private alert: AlertService) {}

    ngOnInit() {
        this.assistantService
            .getAllLecturer()
            .then(res => {
                console.log(res);
                this.lecturers = res as any;
            })
            .catch(err => {
                this.alert.error(err);
            });
    }
}
