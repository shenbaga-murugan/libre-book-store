import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagementComponent } from './book-management/book-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({
  declarations: [
    BookManagementComponent
  ],
  exports: [
    BookManagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AdminModule { }
