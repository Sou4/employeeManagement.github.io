import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Employee } from 'src/app/core/models/employee.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() data;
  empForm: FormGroup;
  currentDate: string;
  isEmailAlreadyExists = false;
  constructor(private _fb: FormBuilder, private _datePipe: DatePipe, private _popService: PopUpService, private _empService: EmployeeService) { }


  ngOnInit(): void {
    this.empForm = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(58)]],
      companyName: ['', [Validators.required, Validators.maxLength(58)]],
      emailID: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern('^[0-9]*-*[0-9]*$')]],
      designation: ['', Validators.required],
      dateOfJoin: ['', Validators.required]
    });
    this.currentDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.setFormValue();

    //To check existing email
    this.empForm.get('emailID')
      .valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(res => {
        if (res && !(this?.data?.empDetails?.emailID && this.data.empDetails.emailID === res.trim())
          && this._empService.findIndexOfEmpObjByEmail(res.trim()) !== -1) {
          this.isEmailAlreadyExists = true;
        } else {
          this.isEmailAlreadyExists = false;
        }
      })
  }

  submit() {
    if (this.empForm.valid && this.empForm.dirty) {
      this.trimSpaces();
      const payload: Employee = this.empForm.value;
      payload.dateOfJoin = this._datePipe.transform(payload.dateOfJoin, 'mediumDate');
      if (this.data.actionType === 'add') {
        payload.avatar = `avatar${Math.floor(Math.random() * 10)}`;
      } else if (this.data.actionType === 'edit') {
        payload.id = this.data.empDetails.id;
        payload.createdDate = this.data.empDetails.createdDate;
      }
      this._empService.addOrUpdate(payload);
      this.close(true);
    } else {
      this.close(false);
    }
  }

  close(value) {
    this._popService.close(value);
  }

  trimSpaces() {
    for (const key in this.empForm.value) {
      if (Object.prototype.hasOwnProperty.call(this.empForm.value, key)) {
        this.empForm.value[key] = this.empForm.value[key].trim ? this.empForm.value[key].trim() : this.empForm.value[key];
      }
    }
  }

  setFormValue() {
    if (this.data?.empDetails && (this.data.actionType === 'edit' || this.data.actionType === 'view')) {
      this.empForm.setValue({
        name: this.data.empDetails.name ? this.data.empDetails.name : '',
        companyName: this.data.empDetails.companyName ? this.data.empDetails.companyName : '',
        emailID: this.data.empDetails.emailID ? this.data.empDetails.emailID : '',
        contactNo: this.data.empDetails.contactNo ? this.data.empDetails.contactNo : '',
        designation: this.data.empDetails.designation ? this.data.empDetails.designation : '',
        dateOfJoin: this.data.empDetails.dateOfJoin ? this._datePipe.transform(this.data.empDetails.dateOfJoin, 'yyyy-MM-dd') : ''
      });
    }
  }

  get name() { return this.empForm.get('name'); }
  get companyName() { return this.empForm.get('companyName'); }
  get emailID() { return this.empForm.get('emailID'); }
  get contactNo() { return this.empForm.get('contactNo'); }
  get designation() { return this.empForm.get('designation'); }
  get dateOfJoin() { return this.empForm.get('dateOfJoin'); }
}
