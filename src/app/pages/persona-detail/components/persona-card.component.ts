import { Platform } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'persona-card',
  template: `
    <ion-card>
      <ion-card-header (click)="content.hidden = !content.hidden" text-center>
        <a>
          {{ label }}
          <span *ngIf="points || points == 0">({{ points }}pp)</span>
          <ion-icon [name]="(content.hidden)?'arrow-down':'arrow-up'"></ion-icon>
        </a>
      </ion-card-header>
      <div #content>
        <ng-content></ng-content>
      </div>
    </ion-card>
  `
})
export class PersonaCardComponent implements OnInit {

  @Input() label;
  @Input() points;
  @ViewChild('content', {static: false}) content: ElementRef; 

  constructor(public platform: Platform) { }

  ngOnInit(): void {
    if (this.platform.is('mobile')) {
      this.content.nativeElement.hidden = true;
    }    
  }

}
