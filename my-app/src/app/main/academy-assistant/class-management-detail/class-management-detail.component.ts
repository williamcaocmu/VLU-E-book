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
  student: any = {
    StudentId : '',
    Name: '',
    Gender: '',
    Class: '',
    Grade: ''
  };
  id:number;
  items: MenuItem[] = [
    {
      label: "Quản lí sinh viên"
    },
    {
      label: "Thông tin sinh viên"
    }
  ];

  constructor(private assistantService: AcademyAssistantService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = +params['id'];
        if(this.id > 0){
          this.assistantService.getDetail(this.id)
          .then((res) => {
            this.student = res;
          })
        }
      }
    )
  }

  updateAccount(){
    this.student['Id'] = this.id;
    console.log(this.student);
  }
}
