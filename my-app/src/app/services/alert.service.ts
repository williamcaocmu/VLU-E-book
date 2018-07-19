import { Injectable } from "@angular/core";
import swal from "sweetalert2";

@Injectable()
export class AlertService {
    constructor() {}

    success(message: any) {
        swal({
            position: "bottom-right",
            type: "success",
            title: message,
            showConfirmButton: false,
            timer: 4000
        });
    }

    error(message: any) {
        swal({
            position: "bottom-right",
            type: "error",
            title: message,
            showConfirmButton: false,
            timer: 5000
        });
    }

    confirm(message: any) {
        return new Promise((resolve, reject) => {
            swal({
                title: "Xác Nhận",
                text: message,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Có",
                cancelButtonText: "Không",
                width: 500
            }).then(result => {
                if (result.value) resolve();
                else reject();
            });
        });
    }
}
