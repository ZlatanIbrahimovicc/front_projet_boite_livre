import {Box} from "./box";
import {User} from "./user";

export interface Reservation {
  id: number;
  utilisateur: User;
  boite: Box;
  reservation: number;
}
