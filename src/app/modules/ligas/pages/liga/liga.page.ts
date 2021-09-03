import { Component, OnInit } from '@angular/core';
import {LigasService} from '../../../../core/services/ligas.service';
import {Liga} from '../../../../shared/model/Liga';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.page.html',
  styleUrls: ['./liga.page.scss'],
})
export class LigaPage implements OnInit {

  ligas: Liga[];
  ligasAuxData: Liga[];

  constructor(
    private ligasService: LigasService,
  ) { }

  async ngOnInit() {
    await this.obtenerLigas();
  }

  async obtenerLigas(){
    this.ligasService.get().subscribe(res => {
      this.ligas = res;
      this.ligasAuxData = this.ligas;
    }, error => {
      console.log('Ocurrio un error al obtener las ligas: ' +  error);
    });
  }

  async filterList(evt) {
    const q = evt.value;
    this.ligas = this.ligasAuxData;
    this.ligas = this.ligas.filter( (liga) => liga.nombre.indexOf(q) > -1);
  }

}
