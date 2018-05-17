import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academy-assistant',
  templateUrl: './academy-assistant.component.html',
  styleUrls: ['./academy-assistant.component.css']
})
export class AcademyAssistantComponent implements OnInit {
  items: any[] = [
    {label:'Quản lí lớp', icon: 'fa-plus', routerLink: ['/main/assistant/class-management']},
    {label:'Quản lí khoá học', icon: 'fa-plus', routerLink: ['/main/assistant/course-management']}
  ]
  constructor() { }

  ngOnInit() {
  }

}
