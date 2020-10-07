import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaListPageRoutingModule } from './persona-list-routing.module';

import { PersonaListPage } from './persona-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaListPageRoutingModule
  ],
  declarations: [PersonaListPage]
})
export class PersonaListModule {}
