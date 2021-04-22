import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Models
import { infoPlayerModel } from '../models/infoPlayer';

//Environment
import { environment } from '../../environments/environment';

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

  // TODO: Falta el resto de servicios

}
