import { Boat_Layout } from "./boat_layout"
import { Map_Point } from "./map_point"

export class race {
    id : number;
    layout : Boat_Layout;
    map_points : Map_Point[];
    date : number;
    duration : number;
    distance : number;

    constructor(date : number, distance : number, duration : number, id: number = null, layout : Boat_Layout = null, map_points : Map_Point[] = null){
        this.date = date;
        this.distance = distance;
        this.duration = duration;
        this.id = id;
        this.layout = layout;
        this.map_points = map_points;
    }
}