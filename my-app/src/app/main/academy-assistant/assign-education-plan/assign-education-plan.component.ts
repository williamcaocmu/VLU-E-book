import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-assign-education-plan",
    templateUrl: "./assign-education-plan.component.html",
    styleUrls: ["./assign-education-plan.component.css"]
})
export class AssignEducationPlanComponent implements OnInit {
    
    nameClass = [];
    quantity: number;

    constructor() {
  
    }

    ngOnInit() {
        
    }    
    create() {
        console.log(this.quantity);
        for (let i = 0; i < this.quantity; i++) {
            this.nameClass.push({
                name: `${i}`,
                value: ""
            });
        }
    }

    clearAll(){
      this.nameClass.length = 0;
    }

    log() {
        console.log(this.nameClass);
    }
}
