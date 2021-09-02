import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {EquiposService} from '../../../../core/services/equipos.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Liga} from '../../../../shared/model/Liga';
import {LigasService} from '../../../../core/services/ligas.service';
import {Equipo} from '../../../../shared/model/Equipo';
import {JugadoresService} from '../../../../core/services/jugadores.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  jugadorForm: FormGroup;

  isSubmitted = false;

  equipos: Equipo[];

  constructor(
    private modalController: ModalController,
    private equiposService: EquiposService,
    private jugadoresService: JugadoresService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.obtenerEquipos();
    this.jugadorForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      equipo: new FormControl('', Validators.required),
      logo: new FormControl(''),
    });
  }

  obtenerEquipos(){
    this.equiposService.get().subscribe(res => {
      this.equipos = res;
    }, error => {
      console.log(error);
    });
  }

  cerrarModal(data?) {
    this.modalController.dismiss({
      data
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.jugadorForm.valid) {
      const objJugador = {
        nombre: this.jugadorForm.get('nombre').value,
        logo: this.jugadorForm.get('logo').value,
        equipoId: this.jugadorForm.get('equipo').value,
      };
      console.log(objJugador);
      this.jugadoresService.post(objJugador).subscribe(res => {
        this.presentToast('Se inserto correctamente el jugador');
        this.cerrarModal(res);
      }, error => {
        this.presentToast('Ocurrio un error, intente nuevamente');
        console.log(error);
      });
    }
  }


}
