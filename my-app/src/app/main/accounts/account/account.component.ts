import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { LoadingService } from '../../../services/loading.service';
import { AccountService } from '../account.service';



@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	accounts : any;
	multipleSelected: any[] = [];

	cars = [
		{
			staffId: 1,
			name: 'Quốc',
			role: 'admin',
			phone: '0962xxxx',
			companyPhone: 'a',
			personalEmail: 'a@gmail.com',
			companyEmail: 'a@gmail.com',
			status: true,

		},
		{
			staffId: 2,
			name: 'Cao',
			role: 'admin',
			phone: '0962xxxxdaskjgdsagdjhasgdjhasgdjhasgdjhasgdjasgdjhasgj',
			companyPhone: 'a',
			personalEmail: 'a@gmail.com',
			companyEmail: 'a@gmail.com',
			status: true,
	
		},
		{
			staffId: 3,
			name: 'Anh',
			role: 'admin',
			phone: '0962xxxxdaskjgdsagdjhasgdjhasgdjhasgdjhasgdjasgdjhasgj',
			companyPhone: 'a',
			personalEmail: 'a@gmail.com',
			companyEmail: 'a@gmail.com',
			status: false,
	
		}
	]

	constructor(private alertService: AlertService, private loadingService: LoadingService, private accountService: AccountService) { }

	ngOnInit() {
		this.accountService.getList()
			.then( res => {
				this.accounts = res;
				console.log(this.accounts);
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
