import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
//services
import { OthelloService } from './../services/othello.service';

//models
import { infoNewGame } from './../models/infoNewGame';

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
  list:{};


  constructor(private router: Router, private firebaseService: FirebaseService,public navCtrl: NavController, public http: HttpClient, private othello : OthelloService) {
     this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn == null) {
     this.router.navigate(['/login'])
     
    } 
   }
   ionViewDidLoad(){
    console.log("Getting Users");
    this.getData(); 
  }
   getData()
   {
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

  ejemplo(){
    console.log("entro")
  }

}
