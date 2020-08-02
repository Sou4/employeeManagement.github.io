import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';

@Pipe({
  name: 'dateSort'
})
export class DateSortPipe implements PipeTransform {

  transform(value: Employee[]): Employee[] {
    return value.sort((emp1: Employee, emp2: Employee) => new Date(emp2.dateOfJoin).getTime() - new Date(emp1.dateOfJoin).getTime());
  }

}
