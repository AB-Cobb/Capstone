import { Boat_Layout } from "./boat_layout"
import { Map_Point } from "./map_point"

export class Race {
    id : number;
    layout : Boat_Layout;
    map_points : Map_Point[];
    name : string;
    date : number;
    duration : number;
    distance : number;

    constructor(date : number, name : string, distance : number, duration : number, id: number = null, layout : Boat_Layout = null, map_points : Map_Point[] = null){
        this.date = date;
        this.name = name;
        this.distance = distance;
        this.duration = duration;
        this.id = id;
        this.layout = layout;
        this.map_points = map_points;
    }
}