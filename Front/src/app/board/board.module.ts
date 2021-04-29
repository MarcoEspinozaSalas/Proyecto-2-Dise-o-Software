import { NgModule, OnInit,Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { BoardPageRoutingModule } from './board-routing.module';
import { BoardPage } from './board.page';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular'; 
//services
import { OthelloService } from './../services/othello.service';

//models
import { infoNewGame } from './../models/infoNewGame';
import { addPlayerModal } from './../models/addPlayerModal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardPageRoutingModule
  ],
  declarations: [BoardPage]
})

export class BoardPageModule  {
  
  



  }


