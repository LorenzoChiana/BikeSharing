export class User {
  nomeUtente: string;
  password: string;

  constructor(nomeUtente: string, password: string) {
    this.nomeUtente = nomeUtente;
    this.password = password;
  }
}
