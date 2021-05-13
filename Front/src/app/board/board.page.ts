import { Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
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
  currentName:'';
  sc1:0;
  sc2:0;
  sc:0;
  game: any;
  varHtml=0;
  var1:number;
  var2:string;
  playerTurnName: '';
  playerTurn=1;
  toastController: any;

  constructor(private router: Router, private firebaseService: FirebaseService,public navCtrl: NavController, public http: HttpClient,
    private othello : OthelloService, private socket: Socket) {
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
          this.currentName = this.game.player1.playerName;
        });
    if (this.datosUsuarioLoggedIn == null) {
     this.router.navigate(['/login'])
    }
  }

  ngOnInit(){
    this.socket.connect();
    this.current = this.datosUsuarioLoggedIn.user.uid;
    this.socket.fromEvent('refresh').subscribe(message => {
      console.log(message);
      this.actRef();
   });
  }

  ngAfterViewInit() {
  }

  ionViewWillLeave() {
   this.socket.disconnect();
  }

  async winner(a:string) {
    const toast = await this.toastController.create({
      message: 'El ganador es '+a,
      color:"success",
      duration: 2000
    });
    toast.present();
  }

  show(){
    if (this.varHtml==1) {
      var t = document.getElementById('hrt') as HTMLInputElement;
      t.classList.add("hrt2");
    }else if (this.varHtml==0) {
      var t = document.getElementById('hrt') as HTMLInputElement;
      t.classList.add("hrt1");
    }
  }

  paint(c:number,p:string){
    if(p!=null){
      if (p=='X') {
        var buttonI = document.getElementById("button" + c.toString()) as HTMLInputElement;
        buttonI.classList.add("mostrarN");
      }else if(p=='O'){
        var buttonA = document.getElementById("button" + c.toString()) as HTMLInputElement;
        buttonA.classList.add("mostrar")
      }
    }
  }

  actRef(){
    let element = <HTMLInputElement>document.getElementById("colId");
    element.click();
  }

  jugada(index:number){
    if(this.current == this.game.player1.playerId){
      this.refresh('X',index);
    }
    else if(this.current == this.game.player2.playerId){
      this.refresh2('O',index);
    }
    this.socket.emit('click-refresh', { test: true });
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
          this.currentName = this.game.player2.playerName;
          this.current = this.game.player2.playerId;
        }
      }
    );
    this.othello.enterGame(this.gameId)
        .subscribe( ( data:any ) => {
          this.game = data.game;
          this.esto2 = this.game.boardGame;
          this.sc1 = this.game.score.player1;
          this.sc2 = this.game.score.player2;
          if(this.game.ended==true){
            if(this.sc1 > this.sc2 ){
              this.winner(this.game.player1.playerName)
            }
            else{
              this.winner(this.game.player2.playerName)
            }
          }
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
          this.currentName = this.game.player1.playerName;
          this.current = this.game.player1.playerId;
        }
      }
    );
    this.othello.enterGame(this.gameId)
        .subscribe( ( data:any ) => {
          this.game = data.game;
          this.esto2 = this.game.boardGame;
          this.sc1 = this.game.score.player1;
          this.sc2 = this.game.score.player2;
          if(this.game.ended==true){
            if(this.sc1 > this.sc2 ){
              this.winner(this.game.player1.playerName)
            }
            else{
              this.winner(this.game.player2.playerName)
            }
          }

    });
  }

}
