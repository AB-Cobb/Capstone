export class Team_member {
    private fname : string;
    private lname : string;
    private email : string;
    private id : number;
    private active : boolean;

    constructor(fname : string, lname : string, email : string, id : number, active : boolean) {
        this.id = id;
        this.lname =lname;
        this.fname = fname;
        this.email = email;
        this.active = active;
    }
    
}