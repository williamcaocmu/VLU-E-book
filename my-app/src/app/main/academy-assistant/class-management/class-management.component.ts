import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})



export class ClassManagementComponent implements OnInit {

  cars = [
    {
      vin: '1',
      year: '1',
      brand: '1',
      color: '1'
    },
    {
      vin: '2',
      year: '2',
      brand: '2',
      color: '2'
    },
    {
      vin: '3',
      year: '3',
      brand: '3',
      color: '3'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
