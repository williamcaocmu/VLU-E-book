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
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { StudentServiceOfficerComponent } from './main/student-service-officer/student-service-officer.component';
import { ApiService } from './services/api.service';
import { LoginService } from './login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpModule } from '@angular/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AccountService } from './main/accounts/account.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MainService } from './main/main.service';
import { GuardRoleService } from './services/guard-role.service';
import { GuardLoginService } from './services/guard-login.service';
import { MenuModule } from 'primeng/menu';
import { ClassManagementComponent } from './main/academy-assistant/class-management/class-management.component';
import { CourseManagementComponent } from './main/academy-assistant/course-management/course-management.component';
import { DataViewModule } from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import { ClassManagementDetailComponent } from './main/academy-assistant/class-management-detail/class-management-detail.component';
import { AcademyAssistantService } from './main/academy-assistant/academy-assistant.service';
import {ChartModule} from 'primeng/chart';
import {TreeTableModule} from 'primeng/treetable';
import {InputMaskModule} from 'primeng/inputmask';


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
    ClassManagementComponent,
    CourseManagementComponent,
    ClassManagementDetailComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash:true}),
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
    PasswordModule,
    HttpModule,
    MessagesModule,
    MessageModule,
    BreadcrumbModule,
    MenuModule,
    DataViewModule,
    PanelModule,
    FileUploadModule,
    DialogModule,
    ChartModule,
    TreeTableModule,
    AccordionModule,
    InputMaskModule

  ],
  providers: [
    AlertService,
    LoadingService,
    ApiService,
    LoginService,
    CookieService,
    AccountService,
    MainService,
    GuardRoleService,
    GuardLoginService,
    AcademyAssistantService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
