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

  getPagination(params: string){
    console.log(params);
    return this.http.get<Array<Equipo>>(`${environment.api.teams}${params}`);
  }

}
