import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { AlertService } from '../../../services/alert.service';
import { MenuItem } from 'primeng/api';


@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
    items: MenuItem[] = [
        { label: 'Tài Khoản' },
        { label: 'Thông Tin Tài Khoản' }
    ];

    id: number;
    account = {
        StaffId: '',
        Role: '',
        Name: '',
        Email: '',
        OtherEmail: '',
        Password: '',
        Phone1: '',
        Phone2: '',

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
                if (this.id != 0) {
                    // Lấy thông tin account nếu đã có id
                    this.accountService.getAccount(this.id)
                        .then(res => {
                            console.log(res);
                            this.account = res as any;
                            this.selectedStatus = (res['Status'] == 1) ? true : false;

                            console.log(this.selectedStatus);

                        })
                        .catch(err => {
                            // this.alertService.error(err);
                        })
                }
            }
        );
    }

    updateAccount() {
        this.account['Status'] = this.selectedStatus;
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