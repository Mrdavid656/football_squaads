import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Equipo} from '../../shared/model/Equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get<Array<Equipo>>(environment.api.teams);
  }

  getByLigaId(ligaId){
    return this.http.get<Array<Equipo>>(`${environment.api.teams}?ligaId=${ligaId}`);
  }

  getPagination(params: string){
    return this.http.get<Array<Equipo>>(`${environment.api.teams}${params}`);
  }

  post(equipo){
    return this.http.post(environment.api.teams, equipo);
  }

  put(id, equipo){
    return this.http.put(`${environment.api.teams}/${id}`, equipo);
  }

  eliminar(id){
    return this.http.delete(`${environment.api.teams}/${id}`);
  }

}
