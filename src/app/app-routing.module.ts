import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './components/schedule/schedule.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  { path: '', redirectTo: '/new', pathMatch: 'full' },
  { path: 'new', component: CreateComponent },
  { path: 'sch/:id', component: ScheduleComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }