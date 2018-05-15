import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

import { LoginComponent } from './login/login.component';
import { LecturerComponent } from './main/lecturer/lecturer.component';
import { StudentComponent } from './main/student/student.component';
import { AccountComponent } from './main/accounts/account/account.component';
import { AccountDetailComponent } from './main/accounts/account-detail/account-detail.component';
import { AcademyAssistantComponent } from './main/academy-assistant/academy-assistant.component';
import { DeanComponent } from './main/dean/dean.component';
import { StudentServiceOfficerComponent } from './main/student-service-officer/student-service-officer.component';

export const routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    {
        path: 'main', component: MainComponent, children: [
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            { path: 'account/:id', component: AccountDetailComponent },
            { path: 'account', component: AccountComponent },
            { path: 'lecturer', component: LecturerComponent },
            { path: 'student', component: StudentComponent },
            { path: 'academy-assistant', component: AcademyAssistantComponent },
            { path: 'dean', component: DeanComponent },
            { path: 'student-service-officer', component: StudentServiceOfficerComponent },
        ]
    },
]
