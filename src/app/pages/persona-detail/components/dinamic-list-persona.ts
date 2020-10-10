import { Component, Input, forwardRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Item } from '../../../interfaces';
import { ModalAttributeComponent } from '../modals/modal-attribute';
import { Pericia } from '../classes/periciasList';
import { Feito } from '../classes/feitosList';
import { Desvantagens } from '../classes/desvantagensList';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DinamicListPersonaComponent),
  multi: true
};

@Component({
  selector: 'dinamic-list-persona',
  template: `
      <ion-fab vertical="top" horizontal="end" slot="fixed">
        <ion-fab-button size="small" color="primary" (click)="presentModalAttribute()">
          <ion-icon name="ellipsis-vertical-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-row>
        <ion-col  size="12" size-ms="6" size-md="6" size-lg="6" size-xl="6"
                  *ngFor="let item of items"
        >
          <attribute-persona  [label]="item.nome"
                              [min]="item.graduacao_min" [max]="item.graduacao_max"
                              [(ngModel)]="item.graduacao"
                              (ngModelChange)="change()"
                              (swipe)="item.checked = false; change()"
          >
            <span *ngIf="bonus && item.habilidade_chave">({{(bonus[item.habilidade_chave]+item.graduacao)|truncateNumber}})</span>
          </attribute-persona>
        </ion-col>
      </ion-row>  
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DinamicListPersonaComponent implements ControlValueAccessor {

  @Input() itemsType: string;
  itemsList: Item[];
  @Input() bonus: any[];
  private onChange;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.itemsType = this.itemsType.toLocaleLowerCase();
    if (this.itemsType === 'feitos') {
      this.itemsList = new Feito().items;
    }else if (this.itemsType === 'pericias') {
      this.itemsList = new Pericia().items;
    }else if (this.itemsType === 'desvantagens'){
      this.itemsList = new Desvantagens().items;
    }
  }

  change() {
    this.onChange(this.items);
  }

  get items() {
    let items = this.itemsList.filter((item) => {
      return item.checked;
    });
    return items;
  }

  async presentModalAttribute() {
    let modal = await this.modalCtrl.create({
      component: ModalAttributeComponent,
      componentProps: {'items': this.itemsList}
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.change());
  }

  writeValue(items: Item[]): void {
    if (items) { 
      items.forEach((item: Item) => {
        let index = this.itemsList.findIndex((itemList: Item) => {
          return itemList.id == item.id;
        });
        
        if (index >= 0) {
          this.itemsList[index].checked = true;
          this.itemsList[index].graduacao = item.graduacao;
        }
      });
    } 
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }

}
