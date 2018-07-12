export class Rack {
  _id: number;
  codice: string;
  latitudine: number;
  longitudine: number;
  indirizzo: string;
  numBike: number;

  constructor(id: number, codice: string, latitudine: number, longitudine: number,
    indirizzo: string, numBike: number) {
    this._id = id;
    this.codice = codice;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
    this.indirizzo = indirizzo;
    this.numBike = numBike;
  }
}

export class Bike {
  _id: number;
  codice: string;
  latitudine: number;
  longitudine: number;
  stato: string;
  rack: string;

  constructor(id: number, codice: string, latitudine: number, longitudine: number, stato: string, rack: string) {
    this._id = id;
    this.codice = codice;
    this.latitudine = latitudine;
    this.longitudine = longitudine;
    this.stato = stato;
    this.rack = rack;
  }
}

export class Rent {
  //id: number;

  timeInit: string;
  timeEnd: string;

  constructor(timeInit: string, timeEnd: string) {
    this.timeInit = timeInit;
    this.timeEnd = timeEnd;
  }
}
