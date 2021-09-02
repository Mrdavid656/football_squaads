import {Component, Input, OnInit} from '@angular/core';
import { Equipo } from 'src/app/shared/model/Equipo';
import {OPERATIONS} from '../../../../core/enum';
import {AlertController, ToastController} from '@ionic/angular';
import {SharedService} from '../../../../core/services/shared.service';
import {EquiposService} from '../../../../core/services/equipos.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input('data') equipos: Equipo[];

  constructor(
    public alertController: AlertController,
    private equiposService: EquiposService,
    public toastController: ToastController,
    private sharedService: SharedService
  ) { }

  ngOnInit() {}

  editarEquipo(){
    console.log('Editar Jugador');
  }

  eliminarEquipo(equipo){
    this.deleteAlert(equipo);
  }

  async deleteAlert(equipo: Equipo) {
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea eliminar el equipo?',
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
            this.equiposService.eliminar(equipo.id).subscribe(res => {
              this.presentToast('Se eliminó correctamente el equipo');
              const data = {
                type: OPERATIONS.DELETE,
                data: equipo,
              };
              this.sharedService.clickEventEquipo(data);
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
