import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpSuccessResponse, Persona } from './../../interfaces';
import { PersonaService } from './../../providers/persona.service';


@Component({
  selector: 'app-persona-detail',
  templateUrl: './persona-detail.page.html',
  styleUrls: ['./persona-detail.page.scss'],
})
export class PersonaDetailPage implements OnInit {

  persona: Persona;

  constructor(
    private route: ActivatedRoute,
    private personaService: PersonaService,
  ) { }

  ngOnInit() {
    const personaId = this.route.snapshot.paramMap.get('personaId');
    this.personaService.getPersona(personaId).subscribe((res: HttpSuccessResponse) => {
      if(!res.errors){
        this.persona = new Persona(res.data);
      }
    });
  }

}
