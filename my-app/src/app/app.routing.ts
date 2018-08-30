import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";

import {LoginComponent} from "./login/login.component";
import {LecturerComponent} from "./main/lecturer/lecturer.component";
import {StudentComponent} from "./main/student/student.component";
import {AccountComponent} from "./main/accounts/account/account.component";
import {AccountDetailComponent} from "./main/accounts/account-detail/account-detail.component";
import {AcademyAssistantComponent} from "./main/academy-assistant/academy-assistant.component";
import {DeanComponent} from "./main/dean/dean.component";
import {StudentServiceOfficerComponent} from "./main/student-service-officer/student-service-officer.component";
import {GuardRoleService} from "./services/guard-role.service";
import {GuardLoginService} from "./services/guard-login.service";
import {ClassManagementComponent} from "./main/academy-assistant/class-management/class-management.component";
import {CourseManagementComponent} from "./main/academy-assistant/course-management/course-management.component";
import {ClassManagementDetailComponent} from "./main/academy-assistant/class-management-detail/class-management-detail.component";
import {ViewHistoryComponent} from "./main/academy-assistant/view-history/view-history.component";
import {ImportCourseComponent} from "./main/academy-assistant/import-course/import-course.component";
import {CourseDetailComponent} from "./main/academy-assistant/course-detail/course-detail.component";
import {EducationPlanComponent} from "./main/academy-assistant/education-plan/education-plan.component";
import {TemporaryPlanComponent} from "./main/academy-assistant/temporary-plan/temporary-plan.component";
import {ViewEducationPlanComponent} from "./main/academy-assistant/view-education-plan/view-education-plan.component";
import {AssignEducationPlanComponent} from "./main/academy-assistant/assign-education-plan/assign-education-plan.component";
import {ManageLecturerComponent} from "./main/academy-assistant/manage-lecturer/manage-lecturer.component";
import {LecturerDetailComponent} from "./main/academy-assistant/lecturer-detail/lecturer-detail.component";
import {CourseDetailKhdtComponent} from "./main/academy-assistant/course-detail-khdt/course-detail-khdt.component";
import {CreateClassFromPlanComponent} from "./main/academy-assistant/create-class-from-plan/create-class-from-plan.component";
import { ManageScoreComponent } from "./main/lecturer/manage-score/manage-score.component";
import {ManageStudentComponent} from "./main/lecturer/manage-student/manage-student.component";

export const routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent, pathMatch: "full"},
    {
        path: "main",
        component: MainComponent,
        children: [
            {
                path: "account/:id",
                component: AccountDetailComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "admin"}
            },
            {
                path: "account",
                component: AccountComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "admin"}
            },
            {
                path: "lecturer",
                component: LecturerComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "lecturer"},
                children: [
                    {
                        path: 'manage-score',
                        component: ManageScoreComponent
                    },
                    {
                        path: 'manage-student',
                        component: ManageStudentComponent
                    }
                ]
            },
            {
                path: "student",
                component: StudentComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "student/parent"}
            },
            {
                path: "assistant",
                component: AcademyAssistantComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "assistant"},
                children: [
                    {
                        path: "class-management",
                        component: ClassManagementComponent
                    },
                    {
                        path: "class-management/:id",
                        component: ClassManagementDetailComponent
                    },
                    {
                        path: "course-management",
                        component: CourseManagementComponent
                    },
                    {
                        path: "view-history",
                        component: ViewHistoryComponent
                    },
                    {
                        path: "import-course",
                        component: ImportCourseComponent
                    },
                    {
                        path: "course-detail/:id",
                        component: CourseDetailComponent
                    },
                    {
                        path: "course-detail-khdt/:id",
                        component: CourseDetailKhdtComponent
                    },
                    {
                        path: "education-plan",
                        component: EducationPlanComponent
                    },
                    {
                        path: "view-education-plan",
                        component: ViewEducationPlanComponent
                    },
                    {
                        path: "assign-education-plan/:id",
                        component: AssignEducationPlanComponent
                    },
                    {
                        path: "manage-lecturer",
                        component: ManageLecturerComponent
                    },
                    {
                        path: "manage-lecturer/:id",
                        component: LecturerDetailComponent
                    },
                    {
                        path: 'manage-lecturer/:id/:gradeId',
                        component: CreateClassFromPlanComponent
                    }
                ]
            },
            {
                path: "dean",
                component: DeanComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "board"}
            },
            {
                path: "student-service-officer",
                component: StudentServiceOfficerComponent,
                canActivate: [GuardRoleService],
                data: {allowedRole: "officer"}
            }
        ]
    }
];
