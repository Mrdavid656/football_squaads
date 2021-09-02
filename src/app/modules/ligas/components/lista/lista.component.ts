import {Component, Input, OnInit} from '@angular/core';
import {Liga} from '../../../../shared/model/Liga';
import {ModalController} from '@ionic/angular';
import {DetalleComponent} from '../detalle/detalle.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input('data') ligas: Liga[];

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async detalleLiga(liga){
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        data: liga
      }
    });
    modal.onDidDismiss().then(res => {
      if(res.data.data){
        // this.cargarDatosIniciales();
      }
    });
    return await modal.present();
  }
}
