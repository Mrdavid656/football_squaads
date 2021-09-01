import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/shared/model/Jugador';
import {EquiposService} from "../../../../core/services/equipos.service";
import {Equipo} from "../../../../shared/model/Equipo";
import {JugadoresService} from "../../../../core/services/jugadores.service";
import {Liga} from "../../../../shared/model/Liga";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.page.html',
  styleUrls: ['./jugador.page.scss'],
})
export class JugadorPage implements OnInit {

  url: string;
  itemListData = [];
  page_number = 1;

  search = '';

  jugadores: Jugador[];
  jugadoresAuxData: Jugador[];

  equipos: Equipo[];

  constructor(
    private equiposService: EquiposService,
    private jugadoresService: JugadoresService,
  ) { }

  async ngOnInit() {
    await this.obtenerEquipos();
    await this.obtenerJugadorPag(false, '');
    await this.obtenerJugadores();
  }

  async obtenerEquipos(){
    this.equiposService.get().subscribe(res => {
      this.equipos = res;
    }, error => {
      console.log('Ocurrio un error al obtener las ligas: ' +  error);
    });
  }

  async obtenerJugadores(){
    this.jugadoresService.get().subscribe(res => {
      res.forEach( jugador => {
        jugador.equipo = this.obtenerEquipoEspecifico(jugador.equipoId);
      });
      this.jugadores = res;
      this.jugadoresAuxData = this.jugadores;
    }, error => {
      console.log('Ocurrio un error al obtener los equipos: ');
      console.log(error);
    });
  }

  async obtenerJugadorPag(isFirstLoad, event){
    this.url = '?_page=' + this.page_number + '&_limit=10';
    this.jugadoresService.getPagination(this.url).subscribe(res => {
      res.forEach( jugador => {
        jugador.equipo = this.obtenerEquipoEspecifico(jugador.equipoId);
        this.itemListData.push(jugador);
      });

      if (res.length <= 0) {
        event.target.disabled = true;
      }

      if (isFirstLoad) {
        event.target.complete();
      }

      this.page_number++;
    }, error => {
      console.log('Ocurrio un error al obtener los equipos: ');
      console.log(error);
    });
  }

  obtenerEquipoEspecifico(equipoId): Equipo{
    return this.equipos.find( obj => obj.id === equipoId);
  }

  doInfinite(event) {
    this.obtenerJugadorPag(true, event);
  }

  async filterList() {
    const q = this.search;
    this.jugadores = this.jugadoresAuxData;
    this.jugadores = this.jugadores.filter( (jugador) => {
      return jugador.nombre.indexOf(q) > -1 || jugador.equipo.nombre.indexOf(q) > -1;
    });
  }


}
