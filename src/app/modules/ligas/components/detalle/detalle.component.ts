import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Liga} from '../../../../shared/model/Liga';
import {EquiposService} from '../../../../core/services/equipos.service';
import { Equipo } from 'src/app/shared/model/Equipo';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() data: Liga;

  equipos: Equipo[] = [];

  constructor(
    private modalController: ModalController,
    private equiposService: EquiposService,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.obtenerEquiposByLiga(this.data.id);
  }

  cerrarModal(data?) {
    this.modalController.dismiss({
      data
    });
  }

  obtenerEquiposByLiga(ligaId){
    this.equiposService.getByLigaId(ligaId).subscribe(res => {
      this.equipos = res;
    }, error => {
      console.log(error);
    });
  }


}
