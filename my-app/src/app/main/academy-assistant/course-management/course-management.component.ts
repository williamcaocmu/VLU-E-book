import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import { TreeNode } from "primeng/api";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { AlertService } from "../../../services/alert.service";
import { LoadingService } from "../../../services/loading.service";

@Component({
  selector: "app-course-management",
  templateUrl: "./course-management.component.html",
  styleUrls: ["./course-management.component.css"]
})
export class CourseManagementComponent implements OnInit {
  grade: any = {
    Name: ""
  };

  class: any = {
    Name: "",
    GradeId: ""
  };

  isCreateGrade: boolean = false;
  isCreateClass: boolean = false;
  selectedGrade: any;

  items: MenuItem[] = [{ label: "Quản lí khoá - lớp" }];
  gradeOptions: any[];
  allGrade: any[];

  Khoa = [];

  LopInkHoa = [];

  data: any;
  options: any;

  constructor(
    private assistantService: AcademyAssistantService,
    private alertService: AlertService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    
    // this.data = {
    //   labels: ["A"],
    //   datasets: [
    //     {
    //       data: [300],
    //       backgroundColor: ["#FF6384"],
    //       hoverBackgroundColor: ["#FF6384"]
    //     }
    //   ]
    // };
    // this.options = {
    //   rotation: 1.0 * Math.PI,
    //   circumference: Math.PI,
    //   legend: { position: "top" },
    //   title: { display: true, text: "Graphics" },
    //   animation: { animateScale: true, animateRotate: true }
    // };

    // let allKhoa = this.cars1.map(x => x.Khoa);
    // this.Khoa = allKhoa.filter(
    //   (value, index, array) => array.indexOf(value) == index
    // );
    // this.Khoa = this.Khoa.map(x => {
    //   return { name: x };
    // });

    // this.LopInkHoa = this.cars1.filter(x => x.Khoa == this.Khoa[0]);
    // console.log(this.LopInkHoa);

    this.getAllGrade();
  }

  getAllGrade() {
    this.loading.start();
    this.assistantService
      .getListGrades()
      .then(res => {
        this.loading.stop();
        this.allGrade = res as any;
      })
      .catch(err => {
        this.alertService.error(err);
      });
  }

  changeStateGrade() {
    this.isCreateGrade = !this.isCreateGrade;
  }

  changeStateClass() {
    this.isCreateClass = !this.isCreateClass;
  }

  addGrade() {
    this.assistantService
      .addGrade(this.grade)
      .then(() => {
        this.alertService.success("Successfully");
        this.grade.Name = "";
        this.getAllGrade();
      })
      .catch(err => {
        this.alertService.error(err);
      });
  }

  addClass() {
    this.class.GradeId = this.selectedGrade["Id"];
    this.assistantService
      .addClass(this.class)
      .then(() => {
        this.alertService.success("Successfully");
        this.class.Name = "";
        this.getAllGrade();
      })
      .catch(err => {
        this.alertService.error(err);
      });
    console.log(this.class);
  }
}
