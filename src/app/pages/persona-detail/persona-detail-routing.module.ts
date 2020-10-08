import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaDetailPage } from './persona-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaDetailPageRoutingModule {}
