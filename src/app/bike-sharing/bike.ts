export class Bike {
  id: number;
  nome: string;
  latitudine: number;
  longitudine: number;

  constructor(id: number, nome: string, latitudine: number, longitudine: number) {
    this.id = id;
    this.nome = nome;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
  }

  getId() {
    return this.id;
  }

  getNome() {
    return this.nome;
  }

  getLatitudine() {
    return this.latitudine;
  }

  getLongitudine() {
    return this.longitudine;
  }
}
