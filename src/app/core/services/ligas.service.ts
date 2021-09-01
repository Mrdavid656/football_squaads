import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Liga } from 'src/app/shared/model/Liga';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  constructor(
    private http: HttpClient
  ) { }

  get(){
    return this.http.get<Array<Liga>>(environment.api.leagues);
  }
}
