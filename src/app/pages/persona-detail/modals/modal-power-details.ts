import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';


import { Power, PowerOption } from '../../../interfaces';
import { ExtrasList } from '../classes/extrasList';
import { FalhasList } from '../classes/falhasList';
import { OpcoesList } from '../classes/opcoesList';
import { PoderesAlternativosList } from '../classes/poderesAlternativosList';

@Component({
  selector: 'modal-power-details',
  template: `
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="end">
                <ion-button (click)="close()">fechar</ion-button>
            </ion-buttons>
            <ion-title>Detalhes do Poder</ion-title> 
        </ion-toolbar>
    </ion-header>
          
    <ion-content>
        <ion-card>
            <ion-card-header>
                <ion-card-title>{{ _power.nome }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-grid>
                    <ion-row>
                        <ion-col size="6">
                            <ion-item>
                                <ion-label>Graduação</ion-label>
                                <ion-select [(ngModel)]="_power.graduacao" (ngModelChange)="change()"
                                            interface="popover">
                                    <ion-select-option *ngFor="let graduacaoOption of graduacaoOptions" 
                                                [value]="graduacaoOption"
                                    >
                                        {{graduacaoOption}}
                                    </ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                        <ion-col size="6">
                            <ion-item>
                                <ion-label>Custo</ion-label>
                                <ion-select [(ngModel)]="_power.custo" (ngModelChange)="change()"
                                            interface="popover">
                                    <ion-select-option *ngFor="let custoOption of custoOptions" 
                                                [value]="custoOption"
                                    >
                                        {{custoOption}}
                                    </ion-select-option>
                                </ion-select>
                            </ion-item>
                        </ion-col>
                    </ion-row>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Extras:</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-row>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Nome</ion-label>
                                        <ion-select #extra interface="popover">
                                            <ion-select-option *ngFor="let extraList of extrasList" 
                                                        [value]="extraList" 
                                            >
                                                {{ extraList.nome }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Modificador</ion-label>
                                        <ion-select *ngIf="extra.value" [(ngModel)]="extra.value.modificador"
                                                    interface="popover"
                                        >
                                            <ion-select-option *ngFor="let modificador of extra.value.modificadores"
                                                        [value]="modificador" 
                                            >
                                                +{{ modificador }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="2">
                                    <ion-fab-button color="secondary" size="small"
                                            *ngIf="extra.value && !extra.value.checked" 
                                            (click)="extra.value.checked = true; change()"
                                    >
                                        <ion-icon name="add"></ion-icon>
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-chip *ngFor="let extra of extras">
                                        <ion-button fill="clear" color="dark" (click)="extra.checked = false; change()">
                                            <ion-icon name="trash"></ion-icon>
                                        </ion-button>
                                        <ion-label>{{ extra.nome }} +{{ extra.modificador }}</ion-label>
                                    </ion-chip>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Falhas:</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-row>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Nome</ion-label>
                                        <ion-select #falha interface="popover">
                                            <ion-select-option *ngFor="let falhaList of falhasList" 
                                                        [value]="falhaList" 
                                            >
                                                {{ falhaList.nome }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Modificador</ion-label>
                                        <ion-select [(ngModel)]="falha.value.modificador"
                                                    *ngIf="falha.value" interface="popover">
                                            <ion-select-option *ngFor="let modificador of falha.value.modificadores" 
                                                        [value]="modificador" 
                                            >
                                                -{{ modificador }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="2">
                                    <ion-fab-button color="danger" size="small" 
                                            *ngIf="falha.value && !falha.value.checked"
                                            (click)="falha.value.checked = true; change()" 
                                    >
                                        <ion-icon name="add"></ion-icon>
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-chip *ngFor="let falha of falhas">
                                        <ion-button fill="clear" color="dark" (click)="falha.checked = false; change();">
                                            <ion-icon name="trash"></ion-icon>
                                        </ion-button>
                                        <ion-label>{{ falha.nome }} -{{ falha.modificador }}</ion-label>
                                    </ion-chip>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Feitos de Poder:</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-row>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Nome</ion-label>
                                        <ion-select #opcao interface="popover">
                                            <ion-select-option *ngFor="let opcaoList of opcoesList" 
                                                        [value]="opcaoList" 
                                            >
                                                {{ opcaoList.nome }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Graduação</ion-label>
                                        <ion-select [(ngModel)]="opcao.value.modificador"
                                                    *ngIf="opcao.value" interface="popover">
                                            <ion-select-option *ngFor="let modificador of opcao.value.modificadores" 
                                                        [value]="modificador" 
                                            >
                                                {{ modificador }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="2">
                                    <ion-fab-button color="primary" size="small" 
                                            *ngIf="opcao.value && !opcao.value.checked"
                                            (click)="opcao.value.checked = true; change()" 
                                    >
                                        <ion-icon name="add"></ion-icon>
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-chip *ngFor="let opcao of opcoes">
                                        <ion-button fill="clear" color="dark" (click)="opcao.checked = false; change();">
                                            <ion-icon name="trash"></ion-icon>
                                        </ion-button>
                                        <ion-label>{{ opcao.nome }} {{ opcao.modificador }}</ion-label>
                                    </ion-chip>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
                    </ion-card>
                    <ion-card>
                        <ion-card-header>
                            <ion-card-title>Poderes Alternativos:</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                            <ion-row>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Nome</ion-label>
                                        <ion-select #pa interface="popover">
                                            <ion-select-option *ngFor="let poderAlternativoList of poderesAlternativosList" 
                                                        [value]="poderAlternativoList" 
                                            >
                                                {{ poderAlternativoList.nome }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="5">
                                    <ion-item>
                                        <ion-label>Graduação</ion-label>
                                        <ion-select [(ngModel)]="pa.value.modificador"
                                                    *ngIf="pa.value" interface="popover">
                                            <ion-select-option *ngFor="let modificador of pa.value.modificadores" 
                                                        [value]="modificador" 
                                            >
                                                {{ modificador }}
                                            </ion-select-option>                            
                                        </ion-select>
                                    </ion-item>
                                </ion-col>
                                <ion-col size="2">
                                    <ion-fab-button color="light" size="small" 
                                            *ngIf="pa.value && !pa.value.checked"
                                            (click)="pa.value.checked = true; change()" 
                                    >
                                        <ion-icon name="add"></ion-icon>
                                    </ion-fab-button>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-chip *ngFor="let poderAlternativo of poderesAlternativos">
                                        <ion-button fill="clear" color="dark" (click)="poderAlternativo.checked = false; change();">
                                            <ion-icon name="trash"></ion-icon>
                                        </ion-button>
                                        <ion-label>{{ poderAlternativo.nome }} {{ poderAlternativo.modificador }}</ion-label>
                                    </ion-chip>
                                </ion-col>
                            </ion-row>
                        </ion-card-content>
                    </ion-card>
                </ion-grid>
            </ion-card-content>
        </ion-card>
    </ion-content>  
  `
})
export class ModalPowerDetailsComponent {

  @Input() power: Power;
  public _power: Power;
  public extrasList: PowerOption[];
  public falhasList: PowerOption[];
  public opcoesList: PowerOption[];  
  public poderesAlternativosList: PowerOption[];  
  public graduacaoOptions: number[] = [];
  public custoOptions: number[] = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initializeItems();
    for(let i: number = 1; i<=20; i++) {
      this.graduacaoOptions.push(i);
    }
    this.custoOptions = this._power.custos;
  }

  get extras() {
    return this.extrasList.filter((extraList) => {
      return extraList.checked;
    }); 
  }

  get falhas() {
    return this.falhasList.filter((falhaList) => {
      return falhaList.checked;
    }); 
  }

  get opcoes() {
    return this.opcoesList.filter((opcaoList) => {
      return opcaoList.checked;
    }); 
  }

  get poderesAlternativos() {
    return this.poderesAlternativosList.filter((poderAlternativoList) => {
      return poderAlternativoList.checked;
    }); 
  }

  change() {
    this._power.extras = this.extras;
    this._power.falhas = this.falhas;
    this._power.opcoes = this.opcoes;
    this._power.poderes_alternativos = this.poderesAlternativos;
  }

  initializeItems() {
    this.extrasList = new ExtrasList().items;
    this.falhasList = new FalhasList().items;
    this.opcoesList = new OpcoesList().items;
    this.poderesAlternativosList = new PoderesAlternativosList().items;
    this._power = this.power;
    
    this._power.extras.forEach((extra) => {
      let extraList = this.extrasList.find((extraList) => {
        return extraList.id == extra.id;
      });

      if (extraList) {
        extraList.checked = true;
        extraList.modificador = extra.modificador;
      }
    });

    this._power.falhas.forEach((falha) => {
      let falhaList = this.falhasList.find((falhaList) => {
        return falhaList.id == falha.id;
      });

      if (falhaList) {
        falhaList.checked = true;
        falhaList.modificador = falha.modificador;
      }
    });

    this._power.opcoes.forEach((opcao) => {
      let opcaoList = this.opcoesList.find((opcaoList) => {
        return opcaoList.id == opcao.id;
      });

      if (opcaoList) {
        opcaoList.checked = true;
        opcaoList.modificador = opcao.modificador;
      }
    });

    this._power.poderes_alternativos.forEach((poderAlternativo) => {
      let poderAlternativoList = this.poderesAlternativosList.find((poderAlternativoList) => {
        return poderAlternativoList.id == poderAlternativo.id;
      });

      if (poderAlternativoList) {
        poderAlternativoList.checked = true;
        poderAlternativoList.modificador = poderAlternativo.modificador;
      }
    });
  }

  close() {
    this.modalCtrl.dismiss(null);
  }

}
