import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async success(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      color: "success",
      duration: 3000
    });
    toast.present();
  }

  async error(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: 'top',
      color: "danger",
      duration: 3000
    });
    toast.present();
  }

}
