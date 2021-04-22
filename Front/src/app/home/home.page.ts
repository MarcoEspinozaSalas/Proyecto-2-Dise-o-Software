import { Component } from '@angular/core';

//Models
import {infoPlayerModel} from '../models/infoPlayer';
//Service
import { OthelloService } from '../services/othello.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataPlayer = new infoPlayerModel();

  constructor(private othelloService: OthelloService) {}

  testService(){
    this.dataPlayer.uid = '4';
    this.dataPlayer.displayName = 'test4';
    this.dataPlayer.email = 'test4@test.com',
    this.othelloService.postPlayer(this.dataPlayer)
      .subscribe((data:any)=>{
        console.log(data);
      });
  }


}
