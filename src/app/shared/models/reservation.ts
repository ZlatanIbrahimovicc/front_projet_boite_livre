import {Box} from "./box";
import {User} from "./user";

export interface Reservation {
  id: number;
  utilisateur: User;
  boite: Box;
  reservation: number;
}

export interface ReservationDTO {
  utilisateur_id: number;
  boite_id: number;
  reservation: number;
}
