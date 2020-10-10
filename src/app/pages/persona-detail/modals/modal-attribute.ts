import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';

import { Item } from './../../../interfaces';

@Component({
  selector: 'modal-attribute',
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
        <ion-item *ngFor="let item of _items">
          <ion-label>{{item.nome}}</ion-label>
          <ion-checkbox [(ngModel)]="item.checked"></ion-checkbox>
        </ion-item>
      </ion-list>

    </ion-content>
  `
})
export class ModalAttributeComponent {

  @Input() items: Item[];
  _items: Item[];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initializeItems();
  }

  initializeItems() {
    this._items = this.items;
  }

  getItems(event: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this._items = this._items.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  close() {
    this.modalCtrl.dismiss(this.items);
  }
}
