export class PaddleronBoat {
    public layout_id : number;
    public team_member_id : number;
    public row : number;
    public side : number;

    constructor(layout_id : number, team_member_id : number, row : number, side : number) {
        this.layout_id = layout_id;
        this.team_member_id = team_member_id;
        this.row = row;
        this.side = side;
    }
}