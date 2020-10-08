import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PersonaDetailPageRoutingModule } from './persona-detail-routing.module';

import { PersonaDetailPage } from './persona-detail.page';
import { PersonaNpComponent } from './components/persona-np.component';
import { PersonaCardComponent } from './components/persona-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaDetailPageRoutingModule
  ],
  declarations: [
    PersonaDetailPage,
    PersonaCardComponent,
    PersonaNpComponent
  ]
})
export class PersonaDetailModule {}
