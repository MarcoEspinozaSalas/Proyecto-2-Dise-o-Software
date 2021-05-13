import { Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

//services
import { OthelloService } from './../services/othello.service';

//models
import { editGame } from './../models/editGame';
import { skipTurn } from './../models/skpTurn'

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements AfterViewInit, OnInit {
  editGameWJugada = new editGame();
  skipTurn = new skipTurn();

  esto2 : any;
  datosUsuarioLoggedIn : any;
  gameId : string;
  actualPlayer: '';
  secondPlayer: '';
  current: '';
  sc1:0;
  sc2:0;
  sc:0;
  game: any;

  var1:number;
  var2:string;

  playerTurnName: '';
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

  ngOnInit(){
    this.current = this.datosUsuarioLoggedIn.user.uid;
   
  } 

  ngAfterViewInit() {
  }



  paint(c:number,p:string){
    if(p!=null){
      if (p=='X') {
        //console.log('primer jugador turno');
        var buttonI = document.getElementById("button" + c.toString()) as HTMLInputElement;
        buttonI.classList.add("mostrarN");
      }else if(p=='O'){
        //console.log('segundo juagdor turno');
        var buttonA = document.getElementById("button" + c.toString()) as HTMLInputElement;
        buttonA.classList.add("mostrar")
      }
    }
  }

  jugada(index:number){  
    console.log('jugador actual:',this.current);
    if(this.current == this.game.player1.playerId){   
      this.refresh('X',index);
    }
    else if(this.current == this.game.player2.playerId){
      this.refresh2('O',index);
    }
   console.log('--------------------8------------------------------');
  }

  refresh(turn:string, index:number){
    this.editGameWJugada.boardGame = this.esto2;
    this.editGameWJugada.currentPlayer = this.game.player1.playerId;
    this.editGameWJugada.idGame = this.gameId;
    this.editGameWJugada.clickedPosition = index;
    this.editGameWJugada.xPlay =turn;
    this.othello.editGame(this.editGameWJugada)
    .subscribe(
      (data:any )=>{
        //console.log(data);
        if (data.success==200) {
          this.current = this.game.player2.playerId;
          /* var card1 = document.getElementById("pt1") as HTMLInputElement;
          card1.classList.add("ptB");
          var card2 = document.getElementById("pt2") as HTMLInputElement;
          card2.classList.remove("ptC"); */
          console.log('OK:',this.var1,this.var2);
        }  
      }
    );
    this.othello.enterGame(this.gameId)
        .subscribe( ( data:any ) => {
          this.game = data.game;
          this.esto2 = this.game.boardGame;
          this.sc1 = this.game.score.player1;
          this.sc2 = this.game.score.player2;    
    });
  }

  refresh2(turn:string, index:number){
    this.editGameWJugada.boardGame = this.esto2;
    this.editGameWJugada.currentPlayer = this.game.player2.playerId;   
    this.editGameWJugada.idGame = this.gameId;
    this.editGameWJugada.clickedPosition = index;
    this.editGameWJugada.xPlay =turn;
    this.othello.editGame(this.editGameWJugada)
    .subscribe(
      (data:any )=>{
        //console.log(data);
        if (data.success==200) {
          this.current = this.game.player1.playerId;
          /* var card1 = document.getElementById("pt1") as HTMLInputElement;
          card1.classList.add("ptC");
          var card2 = document.getElementById("pt2") as HTMLInputElement;
          card2.classList.remove("ptB");  */
          console.log('OK');
        }
      }
    );
    this.othello.enterGame(this.gameId)
        .subscribe( ( data:any ) => {
          this.game = data.game;
          this.esto2 = this.game.boardGame;
          this.sc1 = this.game.score.player1;
          this.sc2 = this.game.score.player2;
    });
  }

}
