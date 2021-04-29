import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  //style="visibility:hidden;"

  esto = [{es:'asd'},{es:'asdasd'},{es:'aasdasdsd'}]

  esto2 = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 'X', 'O', 0, 0, 0,
    0, 0, 0, 'O', 'X', 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ]


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
      
      this.othello.enterGame(this.gameId)
      .subscribe( ( data:any ) => { 
        this.game = data.game;
        this.secondPlayer = this.game.player2.playerName;
      } );

    


    if (this.datosUsuarioLoggedIn == null) {
     this.router.navigate(['/login']) 
    }
  }

  ngOnInit() {}

 

  setVar(){
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.othello.getGame(this.datosUsuarioLoggedIn.user.uid)  
  }

}
