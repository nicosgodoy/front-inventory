import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/pages/dashboard.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { CategoryModule } from './category/category.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryModule
  ]
})
export class DashboardModule { }
