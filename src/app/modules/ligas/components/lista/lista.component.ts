import {Component, Input, OnInit} from '@angular/core';
import {Liga} from '../../../../shared/model/Liga';
import {LigasService} from '../../../../core/services/ligas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {

  @Input('data') ligas: Liga[];

  constructor() { }

  ngOnInit() {
    // this.obtenerLigas();
  }
}
