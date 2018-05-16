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
	items: MenuItem[] = [
		{ label: 'Tài Khoản' },
	];
	accounts: any;
	multipleSelected: any[] = [];
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

	deleteMultiple() {
		console.log(this.multipleSelected);
		this.alertService.confirm('Do u want delete this').then(() => {
			this.alertService.success('Delete Successfully')
		})
	}

	delete() {
		this.alertService.success('success')
	}

	selectAccount(event: any) {
		console.log(event);
	}


}
