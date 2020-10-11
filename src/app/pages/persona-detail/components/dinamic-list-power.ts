import { ModalController } from '@ionic/angular';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

import { Power } from '../../../interfaces';
import { PowersList } from './../classes/powersList';
import { ModalPowerComponent } from '../modals/modal-power';
import { ModalPowerDetailsComponent } from './../modals/modal-power-details';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DinamicListPowerComponent),
  multi: true
};

@Component({
  selector: 'dinamic-list-power',
  template: `
    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button size="small" color="primary" (click)="presentModalPower()">
        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <ion-row>
        <ion-col size="12" size-ms="6" size-md="6" size-lg="4" size-xl="4"
                    *ngFor="let power of powers"
        >
            <ion-card (click)="presentModalPowerDetails(power)"
                      (swipe)="power.checked = false; change()"
            >
                <ion-card-header>
                    <ion-card-title>{{ power.nome }} {{ power.graduacao }} (x{{ power.custo }})</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-chip *ngFor="let extra of power.extras">
                        <ion-label>
                            {{ extra.nome }} +{{ extra.modificador }}
                        </ion-label>
                    </ion-chip>
                    <ion-chip *ngFor="let falha of power.falhas">
                        <ion-label>
                            {{ falha.nome }} -{{ falha.modificador }}
                        </ion-label>
                    </ion-chip>
                    <ion-chip *ngFor="let opcao of power.opcoes">
                        <ion-label>
                            {{ opcao.nome }} {{ opcao.modificador }}
                        </ion-label>
                    </ion-chip>
                    <ion-chip *ngFor="let poderAlternativo of power.poderes_alternativos">
                        <ion-label>
                            {{ poderAlternativo.nome }} {{ poderAlternativo.modificador }}
                        </ion-label>
                    </ion-chip>                        
                </ion-card-content>
            </ion-card>
        </ion-col>
    </ion-row>  
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DinamicListPowerComponent implements ControlValueAccessor {

  @Input() bonus: any[];
  private onChange;
  private powersList: Power[];

  constructor(public modalCtrl: ModalController) {
    this.powersList = new PowersList().items;
  }

  change() {
    this.onChange(this.powers);
  }

  get powers() {
    let powers = this.powersList.filter((power: Power) => {
      return power.checked;
    });
    return powers;
  }

  async presentModalPowerDetails(power: number) {
    const modal = await this.modalCtrl.create({
      component: ModalPowerDetailsComponent,
      componentProps: {'power': power}
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.change());
  }

  async presentModalPower() {
    const modal = await this.modalCtrl.create({
      component: ModalPowerComponent,
      componentProps: {'powers': this.powersList}
    });
    await modal.present();
    modal.onDidDismiss().then(() => this.change());
  }

  writeValue(powers: Power[]): void { 
    if (powers) { 
      powers.forEach((power: Power) => {
        let powerList = this.powersList.find((powerList: Power) => {
          return powerList.poder_id == power.poder_id;
        });
        
        if (powerList) {
          powerList.checked = true;
          powerList.graduacao = power.graduacao;
          powerList.custo = power.custo;
          powerList.extras = power.extras;
          powerList.falhas = power.falhas;
          powerList.opcoes = power.opcoes;
          powerList.poderes_alternativos = power.poderes_alternativos;
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
