import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PersonaDetailPageRoutingModule } from './persona-detail-routing.module';

import { PersonaDetailPage } from './persona-detail.page';
import { NpPersonaComponent } from './components/np-persona.component';
import { CardPersonaComponent } from './components/card-persona.component';
import { AbilityPersonaComponent } from './components/ability-persona.component';
import { TruncateNumberPipe } from './pipes/truncate-number.pipe';
import { AttributePersonaComponent } from './components/attribute-persona.component';
import { DinamicListPersonaComponent } from './components/dinamic-list-persona';
import { ModalAttributeComponent } from './modals/modal-attribute';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaDetailPageRoutingModule
  ],
  declarations: [
    PersonaDetailPage,
    CardPersonaComponent,
    NpPersonaComponent,
    AbilityPersonaComponent,
    AttributePersonaComponent,
    DinamicListPersonaComponent,
    ModalAttributeComponent,
    TruncateNumberPipe
  ],
  entryComponents: [ModalAttributeComponent]
})
export class PersonaDetailModule {}
