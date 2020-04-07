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
  public active: string;

  constructor(
    name: string = null,
    email: string = null,
    phone: string = null,
    gender: string = null,
    wieght: number = null,
    hieght: number = null,
    side_preference: string = null,
    active: string = null,
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
