import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, OnDestroy } from '@angular/core';
import { PopUpService } from '../../../core/services/pop-up/pop-up.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements AfterViewInit, OnDestroy {
  componentRef: any;
  actionType: any;
  openPopupSubscription: any;
  @ViewChild('componentContainer', {read: ViewContainerRef}) popupComponent: ViewContainerRef;
  constructor(private _resolver: ComponentFactoryResolver, private _popService: PopUpService) { }

  ngAfterViewInit(): void {
    this.openPopupSubscription = this._popService.$openPopUp
    .subscribe(res => {
      if (res.componentRef) {
        this.actionType = res.data.actionType;
        this.openComponent(res.componentRef, res.data);
      }
    });
  }

  openComponent(componentRef, data) {
    this.popupComponent.clear();
    const factory = this._resolver.resolveComponentFactory(componentRef); 
    this.componentRef = this.popupComponent.createComponent(factory);
    this.componentRef.instance.data = data;
  }

  destroyComponent() {
    this.componentRef.destroy();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    if (this.openPopupSubscription && this.openPopupSubscription.unsubscribe){
      this.openPopupSubscription.unsubscribe();
    }
  }
}
