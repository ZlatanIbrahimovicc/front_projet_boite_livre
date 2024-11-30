export interface User {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  username: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse{
  message: string;
}
