import { Component, OnInit } from '@angular/core';

import { Persona, HttpSuccessResponse } from './../../interfaces';
import { PersonaService } from './../../providers/persona.service';


@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.page.html',
  styleUrls: ['./persona-list.page.scss'],
})
export class PersonaListPage implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.personaService.getAllPersonas().subscribe((res: HttpSuccessResponse) => {
      if(!res.errors){
        this.personas = res.data;
      }
    });
  }

}
