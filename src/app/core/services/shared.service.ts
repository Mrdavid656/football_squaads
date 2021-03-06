import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectJugador = new Subject<any>();

  private subjectEquipo = new Subject<any>();

  clickEventJugador(data): void {
    this.subjectJugador.next(data);
  }

  getclickEventJugador(): Observable<any>{
    return this.subjectJugador.asObservable();
  }

  clickEventEquipo(data): void {
    this.subjectEquipo.next(data);
  }

  getclickEventEquipo(): Observable<any>{
    return this.subjectEquipo.asObservable();
  }
}
