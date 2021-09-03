import {Component, Input, OnInit} from '@angular/core';
import {Equipo} from '../../../../shared/model/Equipo';
import {ModalController} from '@ionic/angular';
import { JugadoresService } from 'src/app/core/services/jugadores.service';
import {Jugador} from '../../../../shared/model/Jugador';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleEquipoComponent implements OnInit {

  @Input() data: Equipo;

  jugadores: Jugador[] = [];

  constructor(
    private modalController: ModalController,
    private jugadoresService: JugadoresService,
  ) { }

  ngOnInit() {
    this.obtenerJugadoresByEquipo(this.data.id);
  }

  cerrarModal(data?) {
    this.modalController.dismiss({
      data
    });
  }

  obtenerJugadoresByEquipo(equipoId){
    this.jugadoresService.getByEquipoId(equipoId).subscribe(res => {
      this.jugadores = res;
    }, error => {
      console.log(error);
    });
  }

}
