import { Component, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { BoardPageRoutingModule } from './board-routing.module';

import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
//services
import { OthelloService } from './../services/othello.service';

//models
import { infoNewGame } from './../models/infoNewGame';
import { addPlayerModal } from './../models/addPlayerModal';
import { observable } from 'rxjs';
import { editGame } from './../models/editGame';


@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements AfterViewInit {

  editGameWJugada = new editGame();

  esto2 : any;
  datosUsuarioLoggedIn : any;
  gameId : string;
  actualPlayer: '';
  secondPlayer: '';
  game: any;


  constructor(private router: Router, private firebaseService: FirebaseService,public navCtrl: NavController, public http: HttpClient,
    private othello : OthelloService) {
      this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
      this.actualPlayer = this.datosUsuarioLoggedIn.user.displayName;
      this.gameId = localStorage.getItem('idGameCreated')
      

    if (this.datosUsuarioLoggedIn == null) {
     this.router.navigate(['/login'])
    }
  }

  ngAfterViewInit() {
    this.othello.enterGame(this.gameId)
      .subscribe( ( data:any ) => {
        this.game = data.game;
        this.secondPlayer = this.game.player2.playerName;
        this.esto2 = this.game.boardGame;
        this.ocultarFichas();   
      });
  }

  ocultarFichas(){
    var buttonI;
    for (let i = 0; i < this.esto2.length; i++) {
      buttonI = document.getElementById("button" + i) as HTMLInputElement;
      buttonI.classList.add("ocultar");
    }
  }

   jugada(index:number){          
     var buttonI = document.getElementById("button" + index.toString()) as HTMLInputElement;
     buttonI.classList.remove("ocultar");
     buttonI.classList.add("mostrar");
   }

  setVar(){
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.othello.getGame(this.datosUsuarioLoggedIn.user.uid)
  }

}
