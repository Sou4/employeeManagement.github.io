import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { EmployeeMainContainerComponent } from './components/employee-main-container/employee-main-container.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component'; 
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ToolBarComponent, EmployeeMainContainerComponent, ListEmployeesComponent, EmployeeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [ToolBarComponent, EmployeeMainContainerComponent, ListEmployeesComponent, EmployeeFormComponent],
  entryComponents: [EmployeeFormComponent]
})
export class EmployeeModule { }
