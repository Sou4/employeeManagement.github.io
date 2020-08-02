import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  refreshSubscription: any;
  empList: Employee[];
  constructor(private _empService: EmployeeService, private _popService: PopUpService) { }

  ngOnInit(): void {
    this.refreshSubscription = this._empService.$refreshEmpList.subscribe(_res => {
      this.empList = this._empService.getAll();
    });
  }

  edit(emp: Employee): void {
    this._popService.open(EmployeeFormComponent, {
      empDetails: emp,
      actionType: 'edit'
    }).subscribe(res => {
      if (res) {
        this.empList = this._empService.getAll();
        this._popService.open(ConfirmationComponent, {
          actionType: 'success',
          text: 'Successfully updated record'
        }).subscribe();
      }
    });
  }

  view(emp: Employee): void {
    this._popService.open(EmployeeFormComponent, {
      empDetails: emp,
      actionType: 'view'
    }).subscribe();
  }

  delete(emp: Employee): void {
    this._popService.open(ConfirmationComponent, {
      actionType: 'delete',
      text: emp.name
    }).subscribe(res => {
      if (res) {
        this._empService.deleteByID(emp.id)
          .subscribe(_res => {
            this._popService.open(ConfirmationComponent, {
              actionType: 'success',
              text: 'Successfully deleted record'
            }).subscribe();
            this.empList = this._empService.getAll();
          });
      }
    });
  }

  ngOnDestroy(): void {
    if(this?.refreshSubscription?.unsubscribe) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
