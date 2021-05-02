import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
//Models
import {infoPlayerModel} from '../models/infoPlayer';
//Service
import { OthelloService } from '../services/othello.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 datosUsuarioLoggedIn : any;
 email = "";
 password = "";
 dataPlayer = new infoPlayerModel();
 errorMessage = ''; // validation error handle
 error: { name: string, message: string} = {name: '', message: ''}; // control error firebase

  constructor(private firebaseService: FirebaseService, private router: Router, private othelloService: OthelloService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn != null) {
      this.firebaseService.signOut();
    }
  }

  ngOnInit() {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  validateFormLogin(email,password){
    if (email.length === 0 ) {
      this.errorMessage = "Please enter the email";
      return false;
    }
    if (password.length === 0 ) {
      this.errorMessage = "Please enter the password";
      return false;
    }
    if (password.length < 6) {
      this.errorMessage = "The password must be at least 6 characters";
      return false;
    }
    this.errorMessage = "";
    return true;
  }

  onSigninFacebook(){
  this.clearErrorMessage();
  this.firebaseService.loginWithFacebook()
  .then(() => {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.dataPlayer.uid = this.datosUsuarioLoggedIn.user.uid;
    this.dataPlayer.displayName = this.datosUsuarioLoggedIn.user.displayName;
    this.dataPlayer.email = this.datosUsuarioLoggedIn.user.email;
    this.othelloService.postPlayer(this.dataPlayer)
      .subscribe((data:any)=>{
        if (data.FriendList == undefined) {
          localStorage.setItem('FriendList',JSON.stringify(''))
          localStorage.setItem('ListName',JSON.stringify(''))
        }else {
          localStorage.setItem('FriendList',JSON.stringify(data.FriendList))
          localStorage.setItem('ListName',JSON.stringify(data.ListName))
        }
      });
    this.router.navigate(['/lobby'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
  }

  onSigninGoogle(){
    this.clearErrorMessage();
    this.firebaseService.loginWithGoogle()
    .then(() => {
      this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
      this.dataPlayer.uid = this.datosUsuarioLoggedIn.user.uid;
      this.dataPlayer.displayName = this.datosUsuarioLoggedIn.user.displayName;
      this.dataPlayer.email = this.datosUsuarioLoggedIn.user.email;
      this.othelloService.postPlayer(this.dataPlayer)
        .subscribe((data:any)=>{
          if (data.FriendList == undefined) {
            localStorage.setItem('FriendList',JSON.stringify(''))
            localStorage.setItem('ListName',JSON.stringify(''))
          }else {
            localStorage.setItem('FriendList',JSON.stringify(data.FriendList))
            localStorage.setItem('ListName',JSON.stringify(data.ListName))
          }
        });
      this.router.navigate(['/lobby'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
  }

  onSignin(){
    this.clearErrorMessage();
    if (this.validateFormLogin(this.email, this.password)) {
      this.firebaseService.loginWithEmail(this.email, this.password)
      .then(() => {
        this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
        this.dataPlayer.uid = this.datosUsuarioLoggedIn.user.uid;
        this.dataPlayer.displayName = this.datosUsuarioLoggedIn.user.displayName;
        this.dataPlayer.email = this.datosUsuarioLoggedIn.user.email;
        this.othelloService.postPlayer(this.dataPlayer)
          .subscribe((data:any)=>{
            if (data.FriendList == undefined) {
              localStorage.setItem('FriendList',JSON.stringify(''))
              localStorage.setItem('ListName',JSON.stringify(''))
            }else {
              localStorage.setItem('FriendList',JSON.stringify(data.FriendList))
              localStorage.setItem('ListName',JSON.stringify(data.ListName))
            }
          });
        this.router.navigate(['/lobby'])
      }).catch(_error => {
        this.error = _error
        this.router.navigate(['/login'])
      })
    }
  }


}
