import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { DateSortPipe } from './pipes/date-sort.pipe';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';


@NgModule({
  declarations: [PopUpComponent, DateSortPipe, ConfirmationComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [ConfirmationComponent],
  exports: [PopUpComponent, ConfirmationComponent, DateSortPipe]
})
export class SharedModule { }
