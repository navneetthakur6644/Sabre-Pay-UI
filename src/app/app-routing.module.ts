import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilityServiceComponent } from './utility-service/utility-service.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';


export const routes: Routes = [  
  { path: '', component: UtilityServiceComponent, pathMatch: 'full' },  
  { path: 'list-utility', component: UtilityServiceComponent },
  {path: 'login', component: LoginComponent,
  data: {
    title: 'Login page',
    }
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    data: {
      title: 'Home page',
    }
  },
  {
    path: 'report',
    component: ReportComponent,
    data: {
      title: 'Report page',
    }
  }
];  

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
