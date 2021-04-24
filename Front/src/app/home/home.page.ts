import { Component } from '@angular/core';

//Models
import {infoPlayerModel} from '../models/infoPlayer';
//Service
import { OthelloService } from '../services/othello.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  datosUsuarioLoggedIn : any;
  dataPlayer = new infoPlayerModel();

  constructor(private othelloService: OthelloService, private firebaseService: FirebaseService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn != null) {
      this.firebaseService.signOut();
    }
  }

}
