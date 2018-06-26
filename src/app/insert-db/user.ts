export class User {
  id: number;
  name: string;
  address: string;

  constructor(id: number, name: string, address: string) {
    this.id = id;
    this.name = name;
    this.address = address;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }
}
