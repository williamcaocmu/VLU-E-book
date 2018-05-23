import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-class-management',
	templateUrl: './class-management.component.html',
	styleUrls: ['./class-management.component.css']
})



export class ClassManagementComponent implements OnInit {

	selectedStudent : any;
	displayDialog:boolean;
	items: MenuItem[] = [
		{ label: 'Quản lí sinh viên' },
	];

	allTimeSheetData = [
		{project: 'a'},
		{project: 'b'},
		{project: 'c'},
	]
	allProjectNames1 = ['', 'a', 'b', 'c'];
	allProjectNames2 = ['', 'm', 'n', 'p'];

	allProjects1 = this.allProjectNames1.map((proj) => {
		return { label: proj, value: proj }
	});

	allProjects2 = this.allProjectNames2.map((proj) => {
		return { label: proj, value: proj }
	});

	constructor() { }

	ngOnInit() {

	}

	selectStudent(event: Event, student :any){
		this.selectedStudent = student;
		this.displayDialog = true;
		event.preventDefault();
		console.log(student," - ", event);
	}

}
