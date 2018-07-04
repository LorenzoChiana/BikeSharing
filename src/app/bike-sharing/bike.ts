export class Bike {
  id: number;
  nome: string;
  latitudine: number;
  longitudine: number;
  stato: string;

  constructor(id: number, nome: string, latitudine: number, longitudine: number, stato: string) {
    this.id = id;
    this.nome = nome;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
    this.stato = stato;
  }
}
