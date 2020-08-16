import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './subjects/subjects.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { SubjectDetailComponent }  from './subject-detail/subject-detail.component';
import { ClassComponent } from './class/class.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: SubjectDetailComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'details/:id', component: ClassDetailComponent},
  { path: 'sclasses', component: ClassComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}