import {Liga} from './Liga';

export interface Equipo {
  id: string;
  nombre: string;
  logo: string;
  ligaId: string;
  liga?: Liga;
}
