import {Component, Input, OnInit} from '@angular/core';
import {Jugador} from '../../../../shared/model/Jugador';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input('data') jugadores: Jugador[];

  constructor() { }

  ngOnInit() {}

}
