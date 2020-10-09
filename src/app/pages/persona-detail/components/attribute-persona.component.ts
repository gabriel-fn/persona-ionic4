import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AttributePersonaComponent),
  multi: true
};

@Component({
  selector: 'attribute-persona',
  template: `
    <ion-item>
      <ion-label>
        <ng-content></ng-content>
        {{label}}
      </ion-label>

      <ion-badge slot="end" *ngIf="value || value == 0">{{ value }}pp</ion-badge>

      <ion-fab-button color="danger" size="small" slot="end"(click)="decrement()">
        <ion-icon name="remove"></ion-icon>
      </ion-fab-button>

      <ion-fab-button color="secondary" size="small" slot="end" (click)="increment()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-item>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AttributePersonaComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() max: number = 0;
  @Input() min: number = 0;
  private onChange;
  public value: number;

  constructor() {
    console.log('Hello AttributePersonaComponent Component');
  }

  increment(): void {
    if (!this.max || this.value < this.max) {
      this.value++;
      this.onChange(this.value);
    } else if (this.value > this.max) {
      this.value = this.max;
      this.onChange(this.value);
    }
  }

  decrement(): void {
    this.min = Number.isInteger(this.min)?this.min:0;
    if (this.value > this.min) {
      this.value--;
      this.onChange(this.value);
    } else if(this.value < this.min) {
      this.value = this.min;
      this.onChange(this.value);
    }
  }

  writeValue(value: number): void {
    this.min = Number.isInteger(this.min) ? this.min : 0;
    if (value < this.min) {
      this.value = this.min
    } else if (this.max && value > this.max) {
      this.value = this.max;
    } else {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}
