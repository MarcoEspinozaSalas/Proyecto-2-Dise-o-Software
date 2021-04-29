import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Models
import { infoPlayerModel } from '../models/infoPlayer';
import { addPlayerModal } from './../models/addPlayerModal';
import { editGame } from './../models/editGame';
//Environment
import { environment } from '../../environments/environment';
import { skipTurn } from '../models/skpTurn';

@Injectable({
  providedIn: 'root'
})
export class OthelloService {

  constructor(private http: HttpClient) { }

  postPlayer(
    data: infoPlayerModel
  ) {
    return this.http.post(`${environment.urlRootBack}/savePlayerInformation`, data);
  }

  getAllPlayers(){
    return this.http.get(`${environment.urlRootBack}/getAllplayers`);
  }

  getGame(
    uid:string
  ){
    return this.http.get(`${environment.urlRootBack}/newGame?createdBy=${uid}`);
  }


  addPlayer(
    data: addPlayerModal,
  ){
    return this.http.post(`${environment.urlRootBack}/addPlayer`,data);
  }

  enterGame(
    id: string,
  ){
    return this.http.get(`${environment.urlRootBack}/getGame?idGame=${id}`);
  }

  editGame(
    data: editGame
  ){
    return this.http.post(`${environment.urlRootBack}/editGame`,data);
  }

  skipTurn(
    data: skipTurn
  ){
    return this.http.post(`${environment.urlRootBack}/skipTurn`,data);
  }
}
