import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Persona } from '../../../interfaces';

@Component({
  selector: 'modal-persona',
  template: `
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button (click)="close()">fechar</ion-button>
            </ion-buttons>
            <ion-title>{{ persona.nome }}</ion-title> 
        </ion-toolbar>
    </ion-header>

    <ion-content class="ion-text-center">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ persona.nome}}</ion-card-title>
          <ion-card-subtitle>Nível de campanha: {{ persona.np }}</ion-card-subtitle>
          <ion-card-subtitle>Total de pontos: {{ persona.totalPoints.all }}pp</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Habilidades {{ persona.totalPoints.habilidade }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-chip *ngFor="let abilityKey of persona.abilityKeys">
                <ion-label>
                  {{ abilityKey.label }} {{ persona[abilityKey.name] }}
                  ({{ persona.bonusPoints[abilityKey.name]|truncateNumber }})
                </ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Combate {{ persona.totalPoints.combate }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-chip *ngFor="let combatKey of persona.combatKeys">
                <ion-label>
                  {{ combatKey.label }} ({{ persona.bonusPoints[combatKey.name]|truncateNumber }}) 
                  {{ persona[combatKey.name] }}pp
                </ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Salvamentos {{ persona.totalPoints.salvamento }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-chip *ngFor="let savingKey of persona.savingKeys">
                <ion-label>
                  {{ savingKey.label }} ({{ persona.bonusPoints[savingKey.name]|truncateNumber }}) 
                  {{ persona[savingKey.name] }}pp
                </ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card> 

          <ion-card>
            <ion-card-header>
              <ion-card-title>Poderes {{ persona.totalPoints.poder }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <span *ngFor="let poder of persona.poderes">
                <ion-chip>
                  <ion-label>{{ poder.nome }} {{ poder.graduacao }}</ion-label>
                </ion-chip>
                <br>
                (<b>Extras:</b> <span *ngFor="let extra of poder.extras">
                  {{ extra.nome }} +{{ extra.modificador }},
                </span>
                <b>Falhas:</b> <span *ngFor="let falha of poder.falhas">
                  {{ falha.nome }} -{{ falha.modificador }},
                </span>
                <b>Feitos de poder:</b> <span *ngFor="let opcao of poder.opcoes">
                  {{ opcao.nome }} {{ opcao.modificador }},
                </span>
                <b>Poderes Alternativos:</b> <span *ngFor="let poderAlternativo of poder.poderes_alternativos">
                  {{ poderAlternativo.nome }} {{ poderAlternativo.modificador }},
                </span>)
                <br>
              </span>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Feitos {{ persona.totalPoints.feito }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-chip *ngFor="let feito of persona.feitos">
                  <ion-label>
                      {{ feito.nome }} {{ feito.graduacao }}pp                  
                  </ion-label>
                </ion-chip>
            </ion-card-content>
          </ion-card>
          
          <ion-card>
            <ion-card-header>
              <ion-card-title>Pericias {{ persona.totalPoints.pericia }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-chip *ngFor="let pericia of persona.pericias">
                <ion-label>
                  {{ pericia.nome }} 
                  <span *ngIf="persona.bonusPoints[pericia.habilidade_chave]">({{ (persona.bonusPoints[pericia.habilidade_chave] + pericia.graduacao)|truncateNumber }})</span>
                  {{ pericia.graduacao }}pp                  
                </ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card> 

          <ion-card>
            <ion-card-header>
              <ion-card-title>Desvantagens -{{ persona.totalPoints.desvantagem }}pp</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-chip *ngFor="let desvantagem of persona.desvantagens">
                <ion-label>
                  {{ desvantagem.nome }} {{ desvantagem.graduacao }}pp                  
                </ion-label>
              </ion-chip>
            </ion-card-content>
          </ion-card> 

        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class ModalPersonaComponent {

  @Input() persona: Persona;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.persona = new Persona(this.persona);
  }

  close() {
    this.modalCtrl.dismiss(null);
  }

}
