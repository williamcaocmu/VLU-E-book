import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routing";
import { LecturerComponent } from "./main/lecturer/lecturer.component";

import { InputSwitchModule } from "primeng/inputswitch";
import { FormsModule } from "@angular/forms";
import { AccordionModule } from "primeng/accordion"; //accordion and accordion tab
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToggleButtonModule } from "primeng/togglebutton";
import { AcademyAssistantComponent } from "./main/academy-assistant/academy-assistant.component";
import { DeanComponent } from "./main/dean/dean.component";
import { DataTableModule } from "primeng/datatable";
import { ButtonModule } from "primeng/button";
import { AccountComponent } from "./main/accounts/account/account.component";
import { AccountDetailComponent } from "./main/accounts/account-detail/account-detail.component";
import { DropdownModule } from "primeng/dropdown";
import { AlertService } from "./services/alert.service";
import { LoadingService } from "./services/loading.service";
import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from "primeng/radiobutton";
import { PasswordModule } from "primeng/password";
import { StudentServiceOfficerComponent } from "./main/student-service-officer/student-service-officer.component";
import { ApiService } from "./services/api.service";
import { LoginService } from "./login/login.service";
import { CookieService } from "ngx-cookie-service";
import { HttpModule } from "@angular/http";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { AccountService } from "./main/accounts/account.service";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { MainService } from "./main/main.service";
import { GuardRoleService } from "./services/guard-role.service";
import { GuardLoginService } from "./services/guard-login.service";
import { MenuModule } from "primeng/menu";
import { ClassManagementComponent } from "./main/academy-assistant/class-management/class-management.component";
import { CourseManagementComponent } from "./main/academy-assistant/course-management/course-management.component";
import { PanelModule } from "primeng/panel";
import { FileUploadModule } from "primeng/fileupload";
import { DialogModule } from "primeng/dialog";
import { ClassManagementDetailComponent } from "./main/academy-assistant/class-management-detail/class-management-detail.component";
import { AcademyAssistantService } from "./main/academy-assistant/academy-assistant.service";
import { ChartModule } from "primeng/chart";
import { TreeTableModule } from "primeng/treetable";
import { InputMaskModule } from "primeng/inputmask";
import { ViewHistoryComponent } from "./main/academy-assistant/view-history/view-history.component";
import { InplaceModule } from "primeng/inplace";
import { ImportCourseComponent } from "./main/academy-assistant/import-course/import-course.component";
import { MenubarModule } from "primeng/menubar";
import { TabViewModule } from "primeng/tabview";
import { CourseDetailComponent } from "./main/academy-assistant/course-detail/course-detail.component";
import { SplitButtonModule } from "primeng/splitbutton";
import { EducationPlanComponent } from "./main/academy-assistant/education-plan/education-plan.component";
import { PickListModule } from "primeng/picklist";
import { StepsModule } from "primeng/steps";
import { TemporaryPlanComponent } from './main/academy-assistant/temporary-plan/temporary-plan.component';
import { ViewEducationPlanComponent } from './main/academy-assistant/view-education-plan/view-education-plan.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AssignEducationPlanComponent } from './main/academy-assistant/assign-education-plan/assign-education-plan.component';
import {DataViewModule} from 'primeng/dataview';
import {ChipsModule} from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import { ManageLecturerComponent } from './main/academy-assistant/manage-lecturer/manage-lecturer.component';
import { LecturerDetailComponent } from './main/academy-assistant/lecturer-detail/lecturer-detail.component';
import { CourseDetailKhdtComponent } from './main/academy-assistant/course-detail-khdt/course-detail-khdt.component';
import { CreateClassFromPlanComponent } from './main/academy-assistant/create-class-from-plan/create-class-from-plan.component';
import { ManageScoreComponent } from './main/lecturer/manage-score/manage-score.component';
import { ManageStudentComponent } from './main/lecturer/manage-student/manage-student.component';
import {LecturerService} from "./main/lecturer/lecturer.service";
import {StudentComponent} from "./student/student.component";
import {StudentService} from "./student/student.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        AccountComponent,
        AccountDetailComponent,
        LecturerComponent,
        AcademyAssistantComponent,
        DeanComponent,
        StudentServiceOfficerComponent,
        ClassManagementComponent,
        CourseManagementComponent,
        ClassManagementDetailComponent,
        ViewHistoryComponent,
        ImportCourseComponent,
        CourseDetailComponent,
        EducationPlanComponent,
        TemporaryPlanComponent,
        ViewEducationPlanComponent,
        AssignEducationPlanComponent,
        ManageLecturerComponent,
        LecturerDetailComponent,
        CourseDetailKhdtComponent,
        CreateClassFromPlanComponent,
        ManageScoreComponent,
        ManageStudentComponent,
        StudentComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, { useHash: true }),
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
        InputMaskModule,
        InplaceModule,
        MenubarModule,
        SplitButtonModule,
        PickListModule,
        StepsModule,
        KeyFilterModule,
        ChipsModule,
        MultiSelectModule,
        TabViewModule
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
        AcademyAssistantService,
        LecturerService,
        StudentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
