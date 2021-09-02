import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Equipo} from '../../shared/model/Equipo';
import {environment} from '../../../environments/environment';
import {Jugador} from '../../shared/model/Jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get<Array<Jugador>>(environment.api.players);
  }

  getPagination(params: string){
    return this.http.get<Array<Jugador>>(`${environment.api.players}${params}`);
  }

  post(jugador){
    return this.http.post(environment.api.players, jugador);
  }

  eliminar(id){
    return this.http.delete(`${environment.api.players}/${id}`);
  }
}
