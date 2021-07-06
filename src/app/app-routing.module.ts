import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login' ,
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'dash', canActivate: [AuthGuard],component: DashboardComponent },
  { path: 'report', canActivate: [AuthGuard],component: ReportsComponent },


]

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
