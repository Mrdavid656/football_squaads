import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/shared/model/Jugador';
import {EquiposService} from '../../../../core/services/equipos.service';
import {Equipo} from '../../../../shared/model/Equipo';
import {JugadoresService} from '../../../../core/services/jugadores.service';
import {ModalController} from '@ionic/angular';
import {FormularioComponent} from '../../components/formulario/formulario.component';
import {SharedService} from '../../../../core/services/shared.service';
import {Subscription} from 'rxjs';
import {OPERATIONS} from '../../../../core/enum';

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

  clickEventsubscription: Subscription;

  constructor(
    private equiposService: EquiposService,
    private jugadoresService: JugadoresService,
    private modalController: ModalController,
    private sharedService: SharedService,
  ) {
    this.clickEventsubscription = this.sharedService.getclickEventJugador().subscribe((res: any) => {
      switch (res.type) {
        case OPERATIONS.DELETE:
          this.quitarJugadores(res.data);
          break;
        case OPERATIONS.UPDATE:
          break;
      }
    });
  }

  async ngOnInit() {
    await this.cargarDatosIniciales();
  }

  async cargarDatosIniciales(){
    this.page_number = 1;
    this.itemListData = [];
    await this.obtenerEquipos();
    await this.obtenerJugadores();
    await this.obtenerJugadorPag(false, '');
  }

  async ionViewDidEnter() {
    await this.cargarDatosIniciales();
  }

  async obtenerEquipos(){
    this.equiposService.get().subscribe(res => {
      this.equipos = res;
    }, error => {
      console.log('Ocurrio un error al obtener las ligas: ' +  error);
    });
  }

  quitarJugadores(jugador: Jugador){
    const data = this.jugadores.find( obj => obj.id === jugador.id);
    const index = this.jugadores.indexOf(data);
    if(index > -1){
      this.jugadores.splice(index, 1);
      this.itemListData.splice(index, 1);
      this.jugadoresAuxData = this.jugadores;
    }
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
    return this.equipos.find( obj => obj.id == equipoId);
  }

  doInfinite(event) {
    this.obtenerJugadorPag(true, event);
  }

  async filterList() {
    const q = this.search;
    this.jugadores = this.jugadoresAuxData;
    this.jugadores = this.jugadores.filter( (jugador) => jugador.nombre.indexOf(q) > -1 || jugador.equipo.nombre.indexOf(q) > -1);
  }

  async agregarJugador(){
    const modal = await this.modalController.create({
      component: FormularioComponent,
    });
    modal.onDidDismiss().then(res => {
      if(res.data.data){
        const jugador: Jugador = res.data.data;
        jugador.equipo = this.obtenerEquipoEspecifico(jugador.equipoId);
        this.agregarNuevoJugador(jugador);
      }
    });
    return await modal.present();
  }

  agregarNuevoJugador(jugador: Jugador): void{
    this.jugadores.push(jugador);
    this.itemListData.push(jugador);
    this.jugadoresAuxData = this.jugadores;
  }

}
