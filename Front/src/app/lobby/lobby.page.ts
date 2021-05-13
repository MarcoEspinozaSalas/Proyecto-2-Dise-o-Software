import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

//services
import { OthelloService } from './../services/othello.service';

//models
import { infoNewGame } from './../models/infoNewGame';
import { addPlayerModal } from './../models/addPlayerModal';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {

  datosUsuarioLoggedIn : any;
  UserList:any[]=[];
  displayNames: Array<any>;
  public items: Array<any>;
  LoginName:string = "";
  game = new infoNewGame();
  addPlayer = new addPlayerModal();
  games : Array<any>;
  list:{};
  elID = '';
  uid = '';
  secondPlayer: '';
  id='';
  idJoinGame='';
  idFL:any;
  friendList:any;
  testFL= [];
  isPlayerSelected = false;
  listGames: any
  idSpectate= '';
  listAllGames: any;

  toCreate = false;
  toPlay = false;
  conts = false;
  noconts = false;
  toSpectate = false;

  constructor(private router: Router, private firebaseService: FirebaseService,public navCtrl: NavController, public http: HttpClient,
    private othello : OthelloService, public toastController: ToastController) {
     this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
     this.idFL = JSON.parse(localStorage.getItem('FriendList'));
    if (this.datosUsuarioLoggedIn == null) {
     this.router.navigate(['/login'])
    }
    this.othello.getAllPlayers()
      .subscribe(
        data => {
           this.UserList = [{data}];
           this.displayNames = this.UserList[0].data.users
                },
        err => {
                  console.log(err);
                }
    );
      this.refreshPlayers();
   }
   ionViewDidLoad(){
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Jugador guardado con exito',
      animated: true,
      color:"success",
      duration: 2000
    });
    toast.present();
  }
  async error() {
    const toast = await this.toastController.create({
      message: 'Error al guardar el jugador',
      color:"danger",
      duration: 2000
    });
    toast.present();
  }
  async errorDatos() {
    const toast = await this.toastController.create({
      message: 'Ese id no existe',
      color:"danger",
      duration: 2000
    });
    toast.present();
  }
  async verID() {
    const toast = await this.toastController.create({
      message: 'My ID:'+" " + this.datosUsuarioLoggedIn.user.uid,
      animated: true,
      color:"dark",
      duration: 4000
    });
    toast.present();
  }
  createNewGame(){
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.othello.getGame(this.datosUsuarioLoggedIn.user.uid)
    .subscribe(
      (data:any) =>{
            this.game.idGame = data.idGame;
      },
      err => {
      console.log(err);
    }
    )
  }

  ngOnInit() {
  }

  guardar(){
  for (let index = 0; index < this.displayNames.length; index++) {
        if (this.displayNames[index].displayName == this.uid){
          this.secondPlayer = this.displayNames[index].uid;
        }
      }
      this.addPlayer.idGame = this.id;
      this.addPlayer.ndPlayer = this.secondPlayer;
      this.othello.addPlayer(this.addPlayer)
      .subscribe(
        (data:any)=>{
            this.presentToast();
        },
        err =>{
          console.log(err)
          this.error();
        }
      )
      this.isPlayerSelected = true;
  }

  enter(){
    localStorage.setItem('idGameCreated',this.game.idGame);
    if(this.id == " "){
      this.errorDatos()
    }else{
      this.othello.enterGame(this.id)
    .subscribe(
      (data:any)=>{
        this.router.navigate(['/board'])
      },
      err =>{
        console.log(err);
      }
    )
    }

  }

  refreshPlayers(){
    this.othello.getFL(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
        this.friendList = data.data.friendList;
        this.testFL = data.data.friendList;
    });

  }

  getPlayerGames(){
    this.othello.getAllGames(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
         console.log(data.games);    
         this.listGames = data.games;
         this.conts = true;

    });

  }

  getAllPlayerGames(){
    this.othello.getAllGamesPlayers(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
         console.log(data);    
         this.listAllGames = data.games;
         this.noconts = true;

    });

  }

JoinGame(){
  localStorage.setItem('idGameCreated',this.idJoinGame);
    if(this.idJoinGame == " "){
      this.errorDatos()
    }else{
      this.othello.enterGame(this.idJoinGame)
    .subscribe(
      (data:any)=>{
        this.router.navigate(['/board'])
      },
      err =>{
        console.log(err);
      }
    )
    }
}
  enterGame(){
  if(this.idSpectate == " "){
    this.errorDatos();
  }else{
    console.log(this.idSpectate);
      this.othello.enterGame(this.idSpectate)
      .subscribe(
        (data:any)=>{
          this.router.navigate(['/board'])
        },
        err =>{
          console.log(err);
        }
      )
    }
}
  ionViewWillEnter(){
    this.refreshPlayers();
  }

  goToCreate(){
    this.toCreate = true;
  }
  goToPlay(){
    this.toPlay = true;
  }
  goToSpectate(){
    this.toSpectate = true;
  }

  reset(){
    this.toCreate = false;
    this.toPlay = false;
    this.conts = false;
    this.noconts = false;
    this.toSpectate = false;
  }

}
