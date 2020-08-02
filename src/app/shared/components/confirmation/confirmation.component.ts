import { Component, Input, OnInit } from '@angular/core';
import { PopUpService } from 'src/app/core/services/pop-up/pop-up.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input() data;
  constructor(private _popService: PopUpService) { }

  ngOnInit(): void {
    if (this.data.actionType === 'success') {
      setTimeout(() => {
        this._popService.close();
      }, 800);
    }
  }

  close(value): void {
    this._popService.close(value);
  }
}
