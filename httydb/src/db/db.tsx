<<<<<<< HEAD
import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";
import { db_init } from "./db_init";
import {Team_member} from "../models/team-member"
=======
import SQLite from "react-native-sqlite-storage";
import { db_init } from "./db_init";
import {Team_member} from "../models/team_member"
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296

export interface Database {
    open(): Promise<SQLite.SQLiteDatabase>;
    close(): Promise<void>;
<<<<<<< HEAD
    getDB() : Promise<SQLiteDatabase>;
    getTeammemberByID(id : number) : Promise<Team_member>
    insertTeammember(Team_member : Team_member) : Promise<number>
    getAllTeammembers() : Promise<Team_member[]>
    updateTeammamber(team_member : Team_member) : Promise<number>
=======
    getTeammemberByID(id) : Promise<Team_member>
    insertTeammember(Team_member) : Promise<number>
    getAllTeammembers() : Promise<Team_member[]>
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
}

class db_impl implements Database{
    private db_name = "dragon_boat.db";
    private db: SQLite.SQLiteDatabase | undefined;

    public open(): Promise <SQLite.SQLiteDatabase>{
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        let dbInstance: SQLite.SQLiteDatabase;
        return SQLite.openDatabase({
            name: this.db_name,
            location: "default"
        }).then(database => {
            dbInstance = database;
            //initialise DB
            const init = new db_init();
            return init.updateTables(dbInstance);
        }).then (() => {
            this.db = dbInstance;
            return dbInstance;
        })
    }
    public close(): Promise<void> {
        if (this.db !== undefined || this.db !== null){
            return this.db.close().then(() => this.db = undefined)
        }
    }
    public getDB () : Promise<SQLite.SQLiteDatabase> {
        if (this.db !== undefined || this.db !== null)
            return Promise.resolve(this.db)
        return this.open()
    }

    //CRUD opperations
    
<<<<<<< HEAD
    // ------ TEAM MEMBER ------
=======
    //TEAM MEMBER
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
    //insert
    public insertTeammember(member: Team_member) : Promise<number>{
        return this.getDB().then( db => 
            db.executeSql(
<<<<<<< HEAD
                'INSERT INTO team_members (fname, lname, email, active) VALUES (?,?,?,?)',
                [member.fname, member.lname, member.email, member.email])
=======
                'INSERT INTO team_members (team_member_id, name, active) VALUES (?,?,?)',
                [member.id, member.name, member.active])
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
            ).then(([results]) => {
                return results.insertId;
            })
    }

    //get
    public getTeammemberByID(id) : Promise<Team_member>{
       return this.getDB().then( db => 
            db.executeSql('SELECT * FROM team_members WHERE team_member_id = ?;',[id])
            ).then(([results]) => {
                if (results !== undefined){
                    const data = results.rows.item(0);
<<<<<<< HEAD
                    let { fname, lname, email, id, active } = data;
                    active = active > 0; 
                    return new Team_member(fname, lname, email, id, active);
=======
                    let { id, name, active } = data;
                    active = active > 0; 
                    return new Team_member(id, name,active);
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
                }
                else 
                    return Promise.reject()
            })
    }
<<<<<<< HEAD

=======
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
    //get all teammates
    public getAllTeammembers() : Promise<Team_member[]>{
        return this.getDB().then( db => 
            db.executeSql('SELECT * FROM team_members;')).then(([results]) => {
                if (results !== undefined){
                    let team_members : Team_member[] = [];
                    for (let i = 0; i < results.rows.length; i++){
                        const data = results.rows.item(i);
<<<<<<< HEAD
                        let { fname, lname, email, id, active } = data;
                        team_members.push(new Team_member(fname, lname, email, id, active))
=======
                        let { id, name, active } = data;
                        team_members.push(new Team_member(id, name, active))
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
                    }
                    return team_members;
                }
                else 
                    return Promise.reject()
            });
    }
<<<<<<< HEAD
    
=======
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
    //update 
    public updateTeammamber(team_member : Team_member) : Promise<number>{
        return this.getDB().then ( db => 
            db.executeSql(
<<<<<<< HEAD
                'UPDATE team_members SET fname = ?, lname = ?, email = ?, active = ?' +
                 '  WHERE team_member_id = ?;',
                 [team_member.fname,team_member.lname, team_member.email,team_member.active, team_member.id]
=======
                'UPDATE team_members SET id = ?, name = ?, active = ?' +
                 '  WHERE team_member_id = ?;',
                 [team_member.id,,team_member.name, team_member.active]
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
            )
        ).then(([results])=>{
            return results.insertId;
        })
    }
}
<<<<<<< HEAD
export const db: Database = new db_impl(); 
=======
export const db: Database = new db_impl();
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
