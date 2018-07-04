export class User {
  nomeUtente: string;
  passwordUtente: string;
  //admin: boolean;
  tipoUtente: string;

  constructor(nomeUtente: string, passwordUtente: string, tipoUtente: string) {
    //this.id = id;
    this.nomeUtente = nomeUtente;
    this.passwordUtente = passwordUtente;
    this.tipoUtente = tipoUtente;
  }
}
