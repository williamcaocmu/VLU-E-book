import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AcademyAssistantService } from "../academy-assistant.service";
import {TreeNode} from 'primeng/api';

@Component({
  selector: "app-course-management",
  templateUrl: "./course-management.component.html",
  styleUrls: ["./course-management.component.css"]
})
export class CourseManagementComponent implements OnInit {
  grade: any = {
    Name: ""
  };

  isCreateGrade: boolean = false;
  isCreateClass: boolean = false;
  selectedGrade: any;

  items: MenuItem[] = [{ label: "Quản lí khoá - lớp" }];

  allGrade: TreeNode[];

  Khoa = [];

  LopInkHoa = [];

  cars1 = [
    { Lop: "T01", Khoa: "K20" },
    { Lop: "T02", Khoa: "K20" },
    { Lop: "T03", Khoa: "K21" },
    { Lop: "T02", Khoa: "K21" },
    { Lop: "T01", Khoa: "K21" },
    { Lop: "T01", Khoa: "K22" }
  ];

  data: any;
  options: any;

  constructor(private assistantService: AcademyAssistantService) {}

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

    this.assistantService
      .getListGrades()
      .then(res => {
        console.log(res);
        this.allGrade = res as any;
      })
      .catch(err => {
        console.log(err);
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
        console.log("Success");
        this.grade.Name = "";
      })
      .catch(err => {
        console.log(err);
      });
  }
}
