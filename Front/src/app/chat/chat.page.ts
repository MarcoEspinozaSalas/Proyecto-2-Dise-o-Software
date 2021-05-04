import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

//services
import { ToastService } from './../services/toast.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  message = '';
  messages = [];
  currentUser = '';
  userTyping = '';

  constructor(private socket: Socket, private toast:ToastService) {}

  ngOnInit() {
    this.socket.connect();

    let testName= JSON.parse(localStorage.getItem('user'));
    let name = testName.user.displayName;
    this.currentUser = name;

    this.socket.emit('set-name', name);

    this.socket.fromEvent('users-changed')
    .subscribe( data => {
      let user = data['user'];
      if (data['event'] == 'left') {
        this.toast.chatToast(`User left: ${user}`)
      }else{
        this.toast.chatToast(`User joined: ${user}`)
      }
    })

    this.socket.fromEvent('message').subscribe(message => {
     this.messages.push(message);
   });

   this.socket.fromEvent('typing').subscribe(data => {

     var typingElement = document.getElementById("p1") as HTMLInputElement;
     if (this.currentUser != data['user']) {
       this.userTyping = data['user'];
       typingElement.innerHTML =  this.userTyping + ": is typing";
     }
     if (!data['state']) {
       typingElement.innerHTML = "";
     }

   })

  }

  sendMessage() {
     this.socket.emit('send-message', { text: this.message });
     this.message = '';
   }

   ionViewWillLeave() {
    this.socket.disconnect();
  }

  onKey(event){
    if (this.message.length > 0) {
      this.socket.emit('chat-typing', { user: this.currentUser, state: true });
    }
    else{
      this.socket.emit('chat-typing', { user: this.currentUser, state: false });
    }

  }

}
