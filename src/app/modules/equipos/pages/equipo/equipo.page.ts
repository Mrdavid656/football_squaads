import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/core/services/ligas.service';
import {EquiposService} from '../../../../core/services/equipos.service';
import {Equipo} from '../../../../shared/model/Equipo';
import {Liga} from '../../../../shared/model/Liga';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {

  url: string;
  itemListData = [];
  page_number = 1;

  search = '';

  equipos: Equipo[];
  equiposAuxData: Equipo[];
  ligas: Liga[];

  constructor(
    private equiposService: EquiposService,
    private ligasService: LigasService
  ) { }

  async ngOnInit() {
    await this.obtenerLigas();
    await this.obtenerEquiposPag(false, '');
    await this.obtenerEquipos();
  }

  async obtenerLigas(){
    this.ligasService.get().subscribe(res => {
      this.ligas = res;
    }, error => {
      console.log('Ocurrio un error al obtener las ligas: ' +  error);
    });
  }

  async obtenerEquipos(){
    this.equiposService.get().subscribe(res => {
      res.forEach( equipo => {
        equipo.liga = this.obtenerLigaEspecifica(equipo.ligaId);
      });
      this.equipos = res;
      this.equiposAuxData = this.equipos;
    }, error => {
      console.log('Ocurrio un error al obtener los equipos: ');
      console.log(error);
    });
  }

  async obtenerEquiposPag(isFirstLoad, event){
    this.url = '?_page=' + this.page_number + '&_limit=10';
    this.equiposService.getPagination(this.url).subscribe(res => {
      res.forEach( equipo => {
        equipo.liga = this.obtenerLigaEspecifica(equipo.ligaId);
        this.itemListData.push(equipo);
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

  doInfinite(event) {
    this.obtenerEquiposPag(true, event);
  }

  obtenerLigaEspecifica(liga_id): Liga{
    return this.ligas.find( obj => obj.id === liga_id);
  }

  async filterList() {
    const q = this.search;
    this.equipos = this.equiposAuxData;
    this.equipos = this.equipos.filter( (equipo) => {
      return equipo.nombre.indexOf(q) > -1 || equipo.liga.nombre.indexOf(q) > -1;
    });
  }

}
