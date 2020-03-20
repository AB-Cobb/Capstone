export class Map_Point{
    timestamp : number;
    long : number;
    lat : number;
    acc : number;
    speed : number;

    constructor (timestamp : number, long : number, lat : number, acc : number = 0, speed : number = 0 ){
        this.lat = lat;
        this.long = long;
        this.timestamp = timestamp;
    }
}