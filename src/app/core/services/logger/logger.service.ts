import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  info(msg) {
    if (!environment.production) {
      console.log(msg);
    }
  }

  warn(msg) {
      console.warn(msg);
  }

  error(msg) {
      console.error(msg);
  }
}
