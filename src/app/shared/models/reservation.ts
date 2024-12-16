import {Box} from "./box";
import {User} from "./user";

export interface Reservation {
  utilisateur: User;
  boite: Box;
  reservation: number;
}

export interface ReservationDTO {
  id_user: number;
  id_box: number;
  reservation: number;
}
