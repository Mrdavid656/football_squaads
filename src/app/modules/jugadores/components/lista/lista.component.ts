import {Component, Input, OnInit} from '@angular/core';
import {Jugador} from '../../../../shared/model/Jugador';
import {AlertController, ToastController} from '@ionic/angular';
import { JugadoresService } from 'src/app/core/services/jugadores.service';
import {SharedService} from '../../../../core/services/shared.service';
import {OPERATIONS} from "../../../../core/enum";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input('data') jugadores: Jugador[];

  constructor(
    public alertController: AlertController,
    private jugadoresService: JugadoresService,
    public toastController: ToastController,
    private sharedService: SharedService
  ) { }

  ngOnInit() {}

  editarJugador(){
    console.log('Editar Jugador');
  }

  eliminarJugador(jugadorId){
    this.deleteAlert(jugadorId);
  }

  async deleteAlert(jugador: Jugador) {
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el jugador?',
      message: 'Esta operación será irreversible',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Si, eliminar',
          cssClass: 'button-cancel',
          handler: () => {
            this.jugadoresService.eliminar(jugador.id).subscribe(res => {
              this.presentToast('Se elimino correctamente el jugador');
              const data = {
                type: OPERATIONS.DELETE,
                data: res,
              };
              this.sharedService.clickEventJugador(data);
            }, error => {
              console.log(error);
              this.presentToast('Ocurrio un error, intente nuevamente');
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }

}
