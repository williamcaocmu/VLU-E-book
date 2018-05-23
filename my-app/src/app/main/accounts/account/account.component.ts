import { Component, OnInit, Output } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { AccountService } from '../account.service';
import { MenuItem } from 'primeng/api';



@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	selectedAccount: any;
	displayDialog:boolean;
	items: MenuItem[] = [
		{ 
			label: 'Tài Khoản', 
			routerLink: ['/main/account']
		},
	];
	accounts: any;
	constructor(private alertService: AlertService, private loadingService: LoadingService, private accountService: AccountService) { }
	
	ngOnInit() {
		this.accountService.getList()
			.then(res => {
				this.accounts = res;
				
			})
			.catch(err => {
				console.log(err);
			})
	}

	selectAccount(event: Event, account : any) {
		this.selectedAccount = account;
		this.displayDialog = true;
		event.preventDefault();
	}

	


}
