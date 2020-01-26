export class Team_member {
    private fname : string;
    private lname : string;
    private email : string;
    private id : number;
    
    constructor(fname : string, lname : string, email : string, id : number) {
        this.id = id;
        this.lname =lname;
        this.fname = fname;
        this.email = email;
    }
    
}