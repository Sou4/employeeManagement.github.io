import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { DatePipe } from '@angular/common';
import { LoggerService } from '../logger/logger.service';
import * as uuid from 'uuid';
import { EmployeeData } from '../employee/employee.sample.data';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  $refreshEmpList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private _datePipe: DatePipe, private _logger: LoggerService) {
  }

  // This is to set some initial data for first time
  init(): void {
    if (!sessionStorage.getItem('employeeList')) {
      const initialData: Employee[] = EmployeeData;
      this.storeEmployeeData(initialData);
      this._logger.info('added initial employee data');
    }
  }

  addOrUpdate(emp: Employee) {
    const empList: Employee[] = this.getAll();
    emp.lastUpdatedDate = this._datePipe.transform(new Date(), 'mediumDate');

    if (emp.id) {
      const index: number = this.findIndexOfEmpObj(empList, emp.id);
      if (index !== -1) {
        empList[index] = emp;
      }
    } else {
      // Add new employee
      emp.id = uuid.v4();
      emp.createdDate = this._datePipe.transform(new Date(), 'mediumDate');
      empList.push(emp);
    }

    this.storeEmployeeData(empList);
    this._logger.info('added / updated employee data in session');
  }

  getAll(): Employee[] {
    if (sessionStorage.getItem('employeeList')) {
      return JSON.parse(sessionStorage.getItem('employeeList'));
    }
    return [];
  }

  getByID(id: string): Employee {
    const empList: Employee[] = this.getAll();
    const index: number = this.findIndexOfEmpObj(empList, id);
    if (index !== -1) {
      this._logger.info(`returning employee data for id - ${id}`);
      return empList[index];
    }
  }

  findIndexOfEmpObj(empList: Employee[], id: string): number {
    const indexOfObj: number = empList.findIndex(i => i.id === id);
    if (indexOfObj === -1) {
      this._logger.error(`No data found for employee id - ${id}`);
    }
    return indexOfObj;
  }

  findIndexOfEmpObjByEmail(email: string): number {
    const empList: Employee[] = this.getAll();
    const indexOfObj: number = empList.findIndex(i => i.emailID.toLowerCase() === email.toLowerCase());
    if (indexOfObj !== -1) {
      this._logger.warn(`Data found for employee email - ${email}`);
    }
    return indexOfObj;
  }

  deleteByID(id: string): Observable<any> {
    return new Observable(observer => {
      const empList: Employee[] = this.getAll();
      const index: number = this.findIndexOfEmpObj(empList, id);
      if (index !== -1) {
        empList.splice(index, 1);
        this.storeEmployeeData(empList);
        this._logger.info(`employee data for id - ${id} has been deleted`);
      } else {
        this._logger.error(`Not able to delete employee with id - ${id}`);
      }
      observer.next(true);
      observer.complete();
    });

  }

  storeEmployeeData(empList: Employee[]): void {
    sessionStorage.setItem('employeeList', JSON.stringify(empList));
  }
}
