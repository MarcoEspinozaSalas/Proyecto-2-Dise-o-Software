import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Models
import { infoPlayerModel } from '../models/infoPlayer';
import { addPlayerModal } from './../models/addPlayerModal';
import { editGame } from './../models/editGame';
import { friendList } from './../models/friendList';
import { editFL } from './../models/editFL';
import { friend } from './../models/friend';
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
  getAllGames(
    playerId:string
    ){
    
    return this.http.get(`${environment.urlRootBack}/getPlayerGames?playerId=${playerId}`);
  }


  getGame(
    uid:string
  ){
    return this.http.get(`${environment.urlRootBack}/newGame?createdBy=${uid}`);
  }

  getAllGamesPlayers(
    playerID:string
  ){
    return this.http.get(`${environment.urlRootBack}/getAllGames?playerId=${playerID}`);
  }


  addPlayer(
    data: addPlayerModal,
  ){
    return this.http.post(`${environment.urlRootBack}/addPlayer`,data);
  }

  enterGame(
    idXgames: string,
  ){
    console.log(idXgames);
    
    return this.http.get(`${environment.urlRootBack}/getGame?idGame=${idXgames}`);
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

  //Lista de amigos

  createFL(
    data: friendList
  ){
    return this.http.post(`${environment.urlRootBack}/createdFL`, data);
  }

  getFL(
    idListOwner:string
  ){
    return this.http.get(`${environment.urlRootBack}/getFriendListByOwner?idListOwner=${idListOwner}`);
  }

  editFL(
    data: editFL
  ){
    return this.http.put(`${environment.urlRootBack}/editFriendList`, data);
  }

  addFriend(
    data: friend
  ){
      return this.http.put(`${environment.urlRootBack}/addFriend`, data);
  }

  removeFriend(
    data: friend
  ){
      return this.http.put(`${environment.urlRootBack}/removeFriend`, data);
  }

}
