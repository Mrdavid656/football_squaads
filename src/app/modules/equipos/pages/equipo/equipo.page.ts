import { Component, OnInit } from '@angular/core';
import { LigasService } from 'src/app/core/services/ligas.service';
import {EquiposService} from '../../../../core/services/equipos.service';
import {Equipo} from '../../../../shared/model/Equipo';
import {Liga} from '../../../../shared/model/Liga';
import {ModalController} from '@ionic/angular';
import {FormularioComponent} from '../../components/formulario/formulario.component';
import {Subscription} from 'rxjs';
import {SharedService} from '../../../../core/services/shared.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.page.html',
  styleUrls: ['./equipo.page.scss'],
})
export class EquipoPage implements OnInit {

  params: string;
  itemListData: Equipo[] = [];
  page_number = 1;

  search = '';

  equipos: Equipo[];
  equiposAuxData: Equipo[];
  ligas: Liga[];

  clickEventsubscription: Subscription;

  constructor(
    private equiposService: EquiposService,
    private ligasService: LigasService,
    private modalController: ModalController,
    private sharedService: SharedService,
  ) {
    this.clickEventsubscription = this.sharedService.getclickEventEquipo().subscribe((res: any) => {
      this.cargarDatosIniciales();
    });
  }

  async ngOnInit() {
    await this.cargarDatosIniciales();
  }

  async obtenerLigas(){
    this.ligasService.get().subscribe(res => {
      this.ligas = res;
    }, error => {
      console.log('Ocurrio un error al obtener las ligas: ' +  error);
    });
  }

  async cargarDatosIniciales(){
    this.page_number = 1;
    this.itemListData = [];
    await this.obtenerLigas();
    await this.obtenerEquipos();
    await this.obtenerEquiposPag(false, '');
  }

  async obtenerEquipos(){
    this.equiposService.get().subscribe(res => {
      res.forEach( equipo => {
        equipo.liga = this.obtenerLigaEspecifica(equipo.ligaId);
      });
      this.equipos = res;
      this.equiposAuxData = this.equipos;
    }, error => {
      console.log('Ocurrio un error al obtener la lista de equipos: ');
      console.log(error);
    });
  }

  async obtenerEquiposPag(isFirstLoad, event){
    this.params = '?_page=' + this.page_number + '&_limit=10';
    this.equiposService.getPagination(this.params).subscribe(res => {
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
      console.log('Ocurrio un error al obtener los equipos paginados: ');
      console.log(error);
    });
  }

  obtenerLigaEspecifica(liga_id): Liga{
    return this.ligas.find( obj => obj.id == liga_id);
  }

  doInfinite(event) {
    this.obtenerEquiposPag(true, event);
  }

  async filterList() {
    const q = this.search;
    this.equipos = this.equiposAuxData;
    this.equipos = this.equipos.filter( (equipo) => {
      return equipo.nombre.indexOf(q) > -1 || equipo.liga.nombre.indexOf(q) > -1;
    });
  }

  async agregarEquipo(){
    const modal = await this.modalController.create({
      component: FormularioComponent,
    });
    modal.onDidDismiss().then(res => {
      if(res.data.data){
        this.cargarDatosIniciales();
      }
    });
    return await modal.present();
  }

}
