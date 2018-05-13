import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
    check1: boolean ;
    id: number;
    selectedRole;
    NAME:string = 'a';
    name : any;
    roles = [
        { id: '1', role: 'admin' },
        { id: '2', role: 'lecturer' },
        { id: '3', role: 'offical assitant' },
    ];
    val1: string;
    options:any = ['a','b','c'];
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(
            params => {
                this.id = params['id'];
                console.log(this.id);
            }
        );
        this.name = 'b';
    }

    ngOnInit() {
        this.check1 = true;

    }

}
