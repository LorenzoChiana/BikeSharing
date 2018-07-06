export class User {
  nomeUtente: string;
  passwordUtente: string;
  tipoUtente: string;

  constructor(nomeUtente: string, passwordUtente: string, tipoUtente: string) {
    this.nomeUtente = nomeUtente;
    this.passwordUtente = passwordUtente;
    this.tipoUtente = tipoUtente;
  }
}
