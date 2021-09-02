import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';
import { EquiposService } from 'src/app/core/services/equipos.service';
import {LigasService} from '../../../../core/services/ligas.service';
import {Liga} from '../../../../shared/model/Liga';
import { Equipo } from 'src/app/shared/model/Equipo';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  @Input() data: Equipo;

  @ViewChild('formDirective') private formDirective: NgForm;
  equipoForm: FormGroup;

  isSubmitted = false;

  ligas: Liga[];

  ligaSeleccionada;

  constructor(
    private modalController: ModalController,
    private ligasService: LigasService,
    private equiposService: EquiposService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerLigas();
    if (this.data) {
      this.equipoForm = new FormGroup({
        nombre: new FormControl(this.data.nombre, Validators.required),
        liga: new FormControl(this.data.ligaId, Validators.required),
        logo: new FormControl(this.data.logo),
      });
      this.ligaSeleccionada = this.data.ligaId;
    }else {
      this.equipoForm = new FormGroup({
        nombre: new FormControl('', Validators.required),
        liga: new FormControl('', Validators.required),
        logo: new FormControl(''),
      });
    }
  }

  obtenerLigas(){
    this.ligasService.get().subscribe(res => {
      this.ligas = res;
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
    toast.present();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.equipoForm.valid) {
      const objEquipo = {
        nombre: this.equipoForm.get('nombre').value,
        logo: this.equipoForm.get('logo').value,
        ligaId: this.equipoForm.get('liga').value,
      };
      if (this.data) {
        this.equiposService.put(this.data.id, objEquipo).subscribe(res => {
          console.log(res);
          this.presentToast('Se actualizo correctamente el equipo');
          this.cerrarModal(res);
        }, error => {
          this.presentToast('Ocurrio un error, intente nuevamente');
          console.log(error);
        });
      }else{
        this.equiposService.post(objEquipo).subscribe(res => {
          this.presentToast('Se inserto correctamente el equipo');
          this.cerrarModal(res);
        }, error => {
          this.presentToast('Ocurrio un error, intente nuevamente');
          console.log(error);
        });
      }
    }
  }

}
