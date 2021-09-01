import {Component, Input, OnInit} from '@angular/core';
import { Equipo } from 'src/app/shared/model/Equipo';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input('data') equipos: Equipo[];

  constructor() { }

  ngOnInit() {}

}
