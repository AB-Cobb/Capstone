import { Paddler } from "./paddler"

export class Boat_Layout {
    num_paddlers : number;
    name : string;
    date : Date;
    active : boolean;
    id: number
    paddlers : Paddler[][]; 

    constructor(num_paddlers : number, name : string, date : Date, active : boolean, id: number, paddlers :  Paddler[][] = null) {
        this.id = id;
        this.num_paddlers = num_paddlers;
        this.date = date;
        this.name = name;
        this.active = active;
        this.paddlers = paddlers
    }
}