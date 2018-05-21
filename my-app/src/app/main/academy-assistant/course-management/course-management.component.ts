import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {

  items: MenuItem[] = [
		{ label: 'Quản lí khoá - lớp' },
	];

  Khoa = [];

  LopInkHoa = [];

  cars1 = [
    {Lop : "T01" , Khoa : 'K20'},
    {Lop : "T02" , Khoa : 'K20'},
    {Lop : "T03" , Khoa : 'K21'},
    {Lop : "T02" , Khoa : 'K21'},
    {Lop : "T01" , Khoa : 'K21'},
    {Lop : "T01" , Khoa : 'K22'},
  ]

  constructor() { }

  ngOnInit() {
    let allKhoa = this.cars1.map( x => x.Khoa);
    this.Khoa = allKhoa.filter( (value, index, array) => array.indexOf(value) == index);
    console.log(this.Khoa);

    this.LopInkHoa = this.cars1.filter(x => x.Khoa == this.Khoa[0]);
    console.log(this.LopInkHoa);

  }

}
