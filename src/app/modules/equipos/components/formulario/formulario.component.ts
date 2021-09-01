import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';
import { EquiposService } from 'src/app/core/services/equipos.service';
import {LigasService} from '../../../../core/services/ligas.service';
import {Liga} from '../../../../shared/model/Liga';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  equipoForm: FormGroup;

  isSubmitted = false;

  ligas: Liga[];

  constructor(
    private modalController: ModalController,
    private ligasService: LigasService,
    private equiposService: EquiposService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerLigas();
    this.equipoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      liga: new FormControl('', Validators.required),
      logo: new FormControl(''),
    });
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
      console.log(objEquipo);
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
