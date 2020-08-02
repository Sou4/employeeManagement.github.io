import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  $openPopUp = new Subject<any>();
  $responsePopUp = new Subject<any>();
  constructor() { }

  open(componentRef: any, data: any): Observable<any> {
    this.$openPopUp.next({
      componentRef: componentRef,
      data: data
    });
    this.changeDOMDisplay('block');
    return new Observable(observer => {
        this.$responsePopUp.subscribe(res => {
            observer.next(res);
            observer.complete();
        }, _err => {
          observer.next();
          observer.complete();
        });      
    });
  }

  close(data?) {
    this.changeDOMDisplay('none');
    this.$responsePopUp.next(data);
  }

  changeDOMDisplay(value) {
    const domElem:any = document.getElementById('modal-container');
    if (domElem?.style) {
      domElem.style.display = value;
    }
  }
}
