import SQLite from "react-native-sqlite-storage";
import { db_init } from "./db_init";
import {Team_member} from "../models/team_member"

export interface Database {
    open(): Promise<SQLite.SQLiteDatabase>;
    close(): Promise<void>;
    getTeammemberByID(id) : Promise<Team_member>
    insertTeammember(Team_member) : Promise<number>
    getAllTeammembers() : Promise<Team_member[]>
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
    
    //TEAM MEMBER
    //insert
    public insertTeammember(member: Team_member) : Promise<number>{
        return this.getDB().then( db => 
            db.executeSql(
                'INSERT INTO team_members (team_member_id, name, active) VALUES (?,?,?)',
                [member.id, member.name, member.active])
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
                    let { id, name, active } = data;
                    active = active > 0; 
                    return new Team_member(id, name,active);
                }
                else 
                    return Promise.reject()
            })
    }
    //get all teammates
    public getAllTeammembers() : Promise<Team_member[]>{
        return this.getDB().then( db => 
            db.executeSql('SELECT * FROM team_members;')).then(([results]) => {
                if (results !== undefined){
                    let team_members : Team_member[] = [];
                    for (let i = 0; i < results.rows.length; i++){
                        const data = results.rows.item(i);
                        let { id, name, active } = data;
                        team_members.push(new Team_member(id, name, active))
                    }
                    return team_members;
                }
                else 
                    return Promise.reject()
            });
    }
    //update 
    public updateTeammamber(team_member : Team_member) : Promise<number>{
        return this.getDB().then ( db => 
            db.executeSql(
                'UPDATE team_members SET id = ?, name = ?, active = ?' +
                 '  WHERE team_member_id = ?;',
                 [team_member.id,,team_member.name, team_member.active]
            )
        ).then(([results])=>{
            return results.insertId;
        })
    }
}
export const db: Database = new db_impl();