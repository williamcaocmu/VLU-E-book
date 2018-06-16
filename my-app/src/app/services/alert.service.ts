import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AlertService {

    constructor() { }

    success(message) {
        swal({
            position: 'bottom-right',
            type: 'success',
            title: message,
            showConfirmButton: false,
            timer: 4000
        });
    }

    error(message: string) {
        swal({
            position: 'bottom-right',
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 5000
        });
    }

    confirm(message: string) {
        return new Promise((resolve, reject) => {
            swal({
                title: 'Comfirm',
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                console.log(result);
                if (result.value) resolve();
                else reject();
            });
        });
    }

}
