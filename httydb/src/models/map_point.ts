export class Map_Point{
    timestamp : number;
    long : number;
    lat : number;

    constructor (timestamp : number, long : number, lat : number){
        this.lat = lat;
        this.long = long;
        this.timestamp = timestamp;
    }
}