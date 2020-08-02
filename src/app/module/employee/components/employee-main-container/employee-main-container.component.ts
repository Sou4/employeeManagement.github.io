import { Component, OnInit } from '@angular/core';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';


@Component({
  selector: 'app-employee-main-container',
  templateUrl: './employee-main-container.component.html',
  styleUrls: ['./employee-main-container.component.css']
})
export class EmployeeMainContainerComponent implements OnInit {

  constructor(private _popService: PopUpService, private _empService: EmployeeService) { }

  ngOnInit(): void {
  }

  openAddEmployeePopUp() {
    this._popService.open(EmployeeFormComponent, {
      actionType: 'add'
    })
    .subscribe(res => {
      if (res) {
        this._popService.open(ConfirmationComponent, {
          actionType: 'success',
          text: 'Successfully added record'
        }).subscribe();
        this._empService.$refreshEmpList.next(true);
      }
    });
  }

}
