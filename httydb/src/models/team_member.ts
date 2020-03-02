export class Team_member {
  public name: string;
  public gender: string;
  public weight: number;
  public height: number;
  public side_preference: string;
  public email: string;
  public phone: string;
  public emergency_cont: string;
  public id: number;
  public active: boolean;

  constructor(
    name: string,
    email: string,
    phone: string,
    gender: string,
    wieght: number,
    hieght: number,
    side_preference: string,
    active: boolean,
    emergency_cont: string = null,
    id: number = null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.emergency_cont = emergency_cont;
    this.gender = gender;
    this.weight = wieght;
    this.height = hieght;
    this.side_preference = side_preference;
    this.active = active;
  }
}
