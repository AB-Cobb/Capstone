export class Paddler {
    public id : number;
    public perfered_side : string;
    public active : boolean;
    public gender : string;
    public wieght : number;

    constructor(id : number, perfered_side : string, gender : string, wieght : number, active : boolean) {
        this.id = id;
        this.perfered_side = perfered_side;
        this.gender = gender;
        this.wieght = wieght;
        this.active = active;
    }
}