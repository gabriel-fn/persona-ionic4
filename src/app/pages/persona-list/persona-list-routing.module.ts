import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaListPage } from './persona-list.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaListPageRoutingModule {}
