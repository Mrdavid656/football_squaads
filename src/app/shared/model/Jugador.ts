
import {Equipo} from './Equipo';

export interface Jugador {
  id: string;
  nombre: string;
  logo: string;
  equipoId: string;
  equipo?: Equipo;
}
