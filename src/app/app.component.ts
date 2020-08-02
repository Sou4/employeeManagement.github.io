import { Component } from '@angular/core';
import { EmployeeService } from './core/services/employee/employee.service';
import { Employee } from './core/models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _sessionService: EmployeeService){
    this._sessionService.init();
  }
}
