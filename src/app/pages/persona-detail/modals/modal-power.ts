import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';

import { Power } from '../../../interfaces';

@Component({
  selector: 'modal-power',
  template: `
    <ion-header>
      <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button (click)="close()">fechar</ion-button>
          </ion-buttons>
          <ion-title>Opções</ion-title> 
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
    
      <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
      <ion-list>
        <ion-item *ngFor="let power of _powers">
          <ion-label>{{power.nome}}</ion-label>
          <ion-checkbox [(ngModel)]="power.checked"></ion-checkbox>
        </ion-item>
      </ion-list>
    
    </ion-content>  
  `
})
export class ModalPowerComponent {

  @Input() powers: Power[];
  _powers: Power[];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initializeItems();
  }

  initializeItems() {
    this._powers = this.powers;
  }

  getItems(event: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.powers = this.powers.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  close() {
    this.modalCtrl.dismiss(this.powers);
  }

}
