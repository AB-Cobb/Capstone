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
<<<<<<< HEAD
        this.speed = speed;
        this.acc = acc;
=======
        this.acc = acc;
        this.speed = speed;
>>>>>>> c269c61523e1fbe02a8de73fa3d756e74411ce15
    }
}