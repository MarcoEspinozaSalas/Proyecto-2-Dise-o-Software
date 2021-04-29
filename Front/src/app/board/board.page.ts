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
import { Button } from 'selenium-webdriver';


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
  sc1:0;
  sc2:0;
  game: any;
  
  playerTurn=1;

  constructor(private router: Router, private firebaseService: FirebaseService,public navCtrl: NavController, public http: HttpClient,
    private othello : OthelloService) {
      this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
      this.actualPlayer = this.datosUsuarioLoggedIn.user.displayName;
      this.gameId = localStorage.getItem('idGameCreated')
      this.othello.enterGame(this.gameId)
        .subscribe( ( data:any ) => {
          this.game = data.game;
          this.secondPlayer = this.game.player2.playerName;
          this.esto2 = this.game.boardGame;
          this.sc1 = this.game.score.player1;
          this.sc2 = this.game.score.player2;
        });
    if (this.datosUsuarioLoggedIn == null) {
     this.router.navigate(['/login'])
    }
  }

  ngAfterViewInit() {

  }

  paint(c:number,p:string){
    if(p!=null){
      if (p=='X') {
        var buttonI = document.getElementById("button" + c.toString()) as HTMLInputElement;
        buttonI.classList.add("mostrarN");
      }else{
        var buttonI = document.getElementById("button" + c.toString()) as HTMLInputElement;
      buttonI.classList.add("mostrar");
      }
      
    }
    
  }
  

  jugada(index:number){
    
    let turn;
    if(this.playerTurn==1){
      turn='X';
      this.playerTurn = 0;

      var buttonI = document.getElementById("button" + index.toString()) as HTMLInputElement;
      buttonI.classList.add("mostrarN");
    }else{
      turn = 'O';
      this.playerTurn = 1;

      var buttonI = document.getElementById("button" + index.toString()) as HTMLInputElement;
      buttonI.classList.add("mostrar");
    }
    


    this.editGameWJugada.boardGame = this.esto2;
    this.editGameWJugada.currentPlayer = this.datosUsuarioLoggedIn.user.uid;
    this.editGameWJugada.idGame = this.gameId;
    this.editGameWJugada.clickedPosition = index;
    this.editGameWJugada.xPlay =turn;
    
    this.othello.editGame(this.editGameWJugada)
    .subscribe(
      (data:any )=>{
        console.log(data);
        
      }
    );

  }

  setVar(){
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.othello.getGame(this.datosUsuarioLoggedIn.user.uid)
  }

}
