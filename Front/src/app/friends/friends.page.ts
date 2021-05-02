import { Component, OnInit } from '@angular/core';

//Models
import { friendList } from "./../models/friendList";
import { friend } from './../models/friend';
//Services
import { OthelloService } from "./../services/othello.service";
import { ToastService } from "./../services/toast.service";
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  listName:string;

  FL = new friendList();

  datosUsuarioLoggedIn : any;

  idFriendList:any;

  friendList:any;

  addF = new friend();

  deleteF = new friend();

  allPlayers:any;

  idFriendToAdd:any;

  idFriendToDelete:any;

  constructor(private othello: OthelloService, private toast:ToastService) {
  this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
  this.idFriendList = JSON.parse(localStorage.getItem('FriendList'));
  this.listName = JSON.parse(localStorage.getItem('ListName'));
  this.getFriendList();
  this.othello.getAllPlayers()
    .subscribe((data:any)=>{
      this.allPlayers = data.users
      this.deleteUserLoggedIn()
    })
 }

  ngOnInit() {
  }

  createFL(){
    this.FL.idListOwner=this.datosUsuarioLoggedIn.user.uid;
    this.FL.listName=this.listName;
    this.othello.createFL(this.FL)
    .subscribe((data:any)=>{
      if (data) {
        this.idFriendList = data.idFriendList;
        localStorage.setItem('FriendList',JSON.stringify(data.idFriendList))
        localStorage.setItem('ListName',JSON.stringify(data.ListName))
        this.toast.presentToast("Lista de amigos generada con éxito");
        if (data.message == 'Already Exist') {
          this.toast.presentToast("Ya tienes una lista de amigos");
        }
      }
    });
  }

  addFriend(){
    if (this.idFriendToAdd != undefined) {
      this.addF.idList = this.idFriendList
      this.addF.idFriend = this.idFriendToAdd
      this.othello.addFriend(this.addF)
      .subscribe((data:any)=>{
        this.getFriendList();
        this.toast.presentToast("Amigo agregado a la lista: " + this.listName)
      })
    }

  }

  deleteFriend(){
    if (this.idFriendToDelete != undefined) {
      this.deleteF.idList = this.idFriendList
      this.deleteF.idFriend = this.idFriendToDelete
      this.othello.removeFriend(this.deleteF)
      .subscribe((data:any)=>{
        this.getFriendList();
        this.toast.presentToast("Amigo eliminado de la lista: " + this.listName)
      });

    }

  }

  getFriendList(){
    this.othello.getFL(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
        this.friendList = data.data.friendList;
    });
  }

  deleteUserLoggedIn(){
    for (let index = 0; index < this.allPlayers.length; index++) {
        if (this.allPlayers[index].uid == this.datosUsuarioLoggedIn.user.uid) {
           this.allPlayers.splice(index,1);
        }
    }
  }

}
