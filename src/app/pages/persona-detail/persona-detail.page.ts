import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HttpSuccessResponse, Persona } from './../../interfaces';
import { PersonaService } from './../../providers/persona.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalPersonaComponent } from './modals/modal-persona';
import { ToastService } from '../../providers/toast.service';


@Component({
  selector: 'app-persona-detail',
  templateUrl: './persona-detail.page.html',
  styleUrls: ['./persona-detail.page.scss'],
})
export class PersonaDetailPage implements OnInit {

  persona: Persona;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private personaService: PersonaService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    const personaId = this.route.snapshot.paramMap.get('personaId');
    if (isNaN(parseInt(personaId))){
      this.persona = new Persona();
    } else {
      this.personaService.get(personaId).subscribe((res: HttpSuccessResponse) => {
        if(!res.errors){
          this.persona = new Persona(res.data);
        }
      });
    }
  }

  savePersona(forms: NgForm) {
    this.personaService.save(forms.value).subscribe((res: HttpSuccessResponse) => {
      if (!res.errors) {
        this.persona.id = res.data['id'];
      }
      this.toastService.success('Salvo com sucesso!')
    },(error: HttpErrorResponse) => {
      this.toastService.error('Erro ao tentar salvar! Algo de errado não está certo.');
    });
  }

  deletePersona(forms: NgForm) {
    if (forms.value['id']) {
      this.personaService.delete(forms.value['id']).subscribe((res: HttpSuccessResponse) => {
        this.toastService.success('Deletado com sucesso!');
        this.router.navigateByUrl('/personas');
      },(error: HttpErrorResponse) => {
        this.toastService.error('Erro ao tentar deletar! Algo de errado não está certo.');
      });
    }else{
      this.router.navigateByUrl('/personas');
    }
  }

  async presentModalPersona(forms: NgForm) {
    let modal = await this.modalCtrl.create({
      component: ModalPersonaComponent,
      componentProps: {'persona': forms.value} 
    });
    await modal.present();
  }

}
