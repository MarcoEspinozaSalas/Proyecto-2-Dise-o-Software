import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(text:string) {
   const toast = await this.toastController.create({
     message: text,
     duration: 3000
   });
   toast.present();
 }
}
