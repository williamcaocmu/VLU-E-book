import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-dean',
  templateUrl: './dean.component.html',
  styleUrls: ['./dean.component.css']
})
export class DeanComponent implements OnInit {

  items: MenuItem[] = [
    {
        label: "Thông tin trưởng khoa"
    }
];

  constructor() { }

  ngOnInit() {
  }

}
