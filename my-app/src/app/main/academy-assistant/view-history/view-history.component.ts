import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {

  items: MenuItem[] = [{ label: "Quản lí khoá - lớp" }];

  constructor() { }

  ngOnInit() {
  }

}
