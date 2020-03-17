import { Team_member } from "./team_member";

export class Boat_Layout {
    num_paddlers : number;
    name : string;
    date : Date;
    active : boolean;
    id: number
    paddlers : Team_member[][]; 

    constructor(num_paddlers : number, name : string, date : Date, active : boolean, id: number) {
        this.id = id;
        this.num_paddlers = num_paddlers;
        this.date = date;
        this.name = name;
        this.active = active;
        this.paddlers = [new Array(num_paddlers/2), new Array(num_paddlers/2)];
    }
}