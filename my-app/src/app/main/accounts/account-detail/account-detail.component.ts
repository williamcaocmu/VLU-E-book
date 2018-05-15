import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { AlertService } from '../../../services/alert.service';


@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

    id: number;
    account = {
        staffid: '',
        role: '',
        name: '',
        email: '',
        otheremail: '',
        password: '',
        phone1: '',
        phone2: '',

    }

    selectedStatus: boolean;

    allRoles = [
        { shortNameRole: 'admin', fullNameRole: 'Admin' },
        { shortNameRole: 'assistant', fullNameRole: 'Academy Assistant' },
        { shortNameRole: 'officer', fullNameRole: 'Student Service Officer' },
        { shortNameRole: 'student/parent', fullNameRole: 'Student' },
        { shortNameRole: 'board', fullNameRole: 'Falcuty Board' },
    ]
    
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private accountService: AccountService, private alertService: AlertService) {
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe(
            params => {
                this.id = +params['id'];
                this.accountService.getAccount(this.id)
                    .then(res => {
                        console.log(res);
                        this.account = res as any;
                        this.selectedStatus = (res['status'] == 1) ? true : false;

                        console.log(this.selectedStatus);

                    })
                    .catch(err => {
                        this.alertService.error(err);
                    })
            }
        );
    }

    updateAccount() {
        this.account['status'] = this.selectedStatus;
        this.accountService.updateAccount(this.account)
            .then(res => {
                this.alertService.success('Updated Successfully !');
            })
            .catch(err => {
                console.log("Lỗi update ", err);
            })
    }

    addAccount() {

        this.accountService.add(this.account)
            .then(res => {
                this.alertService.success('Add Successfully')

            })
            .catch(err => {
                this.alertService.error(err);
            })
    }

}
