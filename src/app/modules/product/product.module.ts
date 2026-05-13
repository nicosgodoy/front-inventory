import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
     MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,      // ← para mat-dialog-content, mat-dialog-title
        MatFormFieldModule,   // ← para mat-form-field
        MatInputModule,       // ← para matInput
        MatButtonModule
  ]
})
export class ProductModule { }
