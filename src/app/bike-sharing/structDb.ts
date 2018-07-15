export class Rack {
  _id: number;
  codice: string;
  latitudine: number;
  longitudine: number;
  indirizzo: string;
  numBike: number;
  numPlace: number;

  constructor(id: number, codice: string, latitudine: number, longitudine: number,
    indirizzo: string, numBike: number, numPlace: number) {
    this._id = id;
    this.codice = codice;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
    this.indirizzo = indirizzo;
    this.numBike = numBike;
    this.numPlace = numPlace;
  }
}

export class Bike {
  _id: number;
  codice: string;
  latitudine: number;
  longitudine: number;
  stato: string;
  rack: string;
  totKm: number;

  constructor(id: number, codice: string, latitudine: number, longitudine: number,
    stato: string, rack: string, totKm: number) {
    this._id = id;
    this.codice = codice;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
    this.stato = stato;
    this.rack = rack;
    this.totKm = totKm;
  }
}

export class Rent {
  _id: number;
  data: string;
  nameUser: string;
  codeBike: string;
  timeInit: string;
  timeEnd: string;
  tempo: number;
  costo: number;

  constructor(_id: number, data: string, nameUser: string, codeBike: string,
              timeInit: string, timeEnd: string,
              tempo: number, costo: number) {
    this._id = _id;
    this.data = data;
    this.nameUser = nameUser;
    this.codeBike = codeBike;
    this.timeInit = timeInit;
    this.timeEnd = timeEnd;

    this.tempo = tempo;
    this.costo = costo;
  }
}

export class Comment {
  _id: number;
  data: string;
  nameUser: string;
  codeBike: string;
  testo: string;
  icona: string;

  constructor(_id: number, data: string, nameUser: string, codeBike: string,
              testo: string, icona: string) {
    this._id = _id;
    this.data = data;
    this.nameUser = nameUser;
    this.codeBike = codeBike;
    this.testo = testo;
    this.icona = icona;
  }
}
