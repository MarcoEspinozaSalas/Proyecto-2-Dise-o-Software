import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { ToastService } from '../services/toast.service';
import {infoPlayerModel} from '../models/infoPlayer';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  @ViewChild('inputCorreo') inputCorreo;
  @ViewChild('inputContra') inputContra;
  @ViewChild('inputDisplayName') inputDisplayName;

  datosUsuarioLoggedIn : any;

  dataPlayer = new infoPlayerModel();

  displayName = "";
  email = "";
  password = "";
  errorMessage = ''; // validation error handle
  error: { name: string, message: string} = {name: '', message: ''}; // control error firebase

  constructor(private router: Router, private firebaseService: FirebaseService, private toastService: ToastService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  validateFormRegister(displayName,email,password){
    if (displayName.length === 0 ) {
      this.errorMessage = "Please enter the name";
      return false;
    }
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

  onSignup(){
    this.clearErrorMessage();
    if (this.validateFormRegister(this.displayName,this.email, this.password)) {
      this.firebaseService.registerWithEmail(this.displayName,this.email, this.password)
      .then(() => {
        
        this.toastService.presentToast("Registro exitoso, ahora puedes iniciar sesión");
        this.inputCorreo.nativeElement.value = '';
        this.inputContra.nativeElement.value = '';
        this.inputDisplayName.nativeElement.value = '';
        this.delay(2500).then(any=>{
            this.router.navigate(['/login'])
        });
      }).catch(_error => {
        this.error = _error
        this.router.navigate(['/login'])
      })
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log(""));
  }

}
