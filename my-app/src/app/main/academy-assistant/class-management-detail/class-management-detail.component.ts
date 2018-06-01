import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-class-management-detail",
  templateUrl: "./class-management-detail.component.html",
  styleUrls: ["./class-management-detail.component.css"]
})
export class ClassManagementDetailComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: "Quản lí sinh viên"
    },
    {
      label: "Thông tin sinh viên"
    }
  ];

  constructor(private assistantService: AcademyAssistantService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
