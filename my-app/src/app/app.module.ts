import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LecturerComponent } from './main/lecturer/lecturer.component';
import { StudentComponent } from './main/student/student.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AcademyAssistantComponent } from './main/academy-assistant/academy-assistant.component';
import { DeanComponent } from './main/dean/dean.component';
import { DataTableModule } from 'primeng/datatable';
import { ButtonModule } from 'primeng/button';
import { AccountComponent } from './main/accounts/account/account.component';
import { AccountDetailComponent } from './main/accounts/account-detail/account-detail.component';
import { DropdownModule } from 'primeng/dropdown';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PasswordModule} from 'primeng/password';
import { StudentServiceOfficerComponent } from './main/student-service-officer/student-service-officer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    AccountComponent,
    AccountDetailComponent,
    LecturerComponent,
    StudentComponent,
    AcademyAssistantComponent,
    DeanComponent,
    StudentServiceOfficerComponent,
    

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    InputSwitchModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToggleButtonModule,
    DataTableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    PasswordModule
  ],
  providers: [AlertService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
