import SQLite, { SQLiteDatabase } from "react-native-sqlite-storage";

import { db_init } from "./db_init";
import {Team_member} from "../models/team_member";
import { Boat_Layout } from "../models/boat_layout";
import { Map_Point} from "../models/map_point";
import { Paddler } from "../models/paddler";
import { race } from "../models/race";

interface Database {
    open(): Promise<SQLite.SQLiteDatabase>;
    close(): Promise<void>;
    getDB() : Promise<SQLiteDatabase>;
    getTeammemberByID(id : number) : Promise<Team_member>
    insertTeammember(Team_member : Team_member) : Promise<number>
    getAllTeammembers() : Promise<Team_member[]>
    updateTeammamber(team_member : Team_member) : Promise<number>
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
        if (this.db !== undefined){
            return this.db.close().then(() => this.db = undefined)
        }
    }
    public getDB () : Promise<SQLite.SQLiteDatabase> {
        if (this.db !== undefined)
        {
            return Promise.resolve(this.db)
        }
        console.log("getDB(): opening DB")
        return this.open()
    }

    //CRUD opperations
    
    // ------ TEAM MEMBER ------
    //insert
    public insertTeammember(team_member: Team_member) : Promise<number>{
        return this.getDB().then( db => 
            db.executeSql(
                'INSERT INTO team_member (name, email, phone, gender, wieght, hieght, side_preference, active, emergency_cont) VALUES (?,?,?,?)',
                [team_member.name, team_member.email, team_member.phone, team_member.gender, team_member.wieght, team_member.hieght, team_member.side_preference, team_member.active, team_member.emergency_cont])
            ).then(([results]) => {
                console.log("insert team_member with ID: ", results.insertId)
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
                    let { name, email, phone , gender, weight , height, side_preference, active, emergency_cont, id } = data;
                    active = active > 0; 
                    return new Team_member(name, email, phone , gender, weight , height, side_preference, active, emergency_cont, id);
                }
                else 
                    return Promise.reject()
            })
    }
    //get all teammates
    public getAllTeammembers() : Promise<Team_member[]>{
        return this.getDB().then( db => 
            db.executeSql('SELECT * FROM team_member;')).then(([results]) => {
                if (results !== undefined){
                    let team_members : Team_member[] = [];
                    for (let i = 0; i < results.rows.length; i++){
                        const data = results.rows.item(i);
                        let { name, email, phone , gender, weight , height, side_preference, active, emergency_cont, id } = data;
                        team_members.push(new Team_member(name, email, phone , gender, weight , height, side_preference, active, emergency_cont, id))
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
                'UPDATE team_member SET name = ?, email = ?, phone = ?, gender = ?, wieght = ?, hieght = ? , side_preference = ?, active = ?, emergency_cont =?' +
                 '  WHERE team_member_id = ?;',
                 [team_member.name, team_member.email, team_member.phone, team_member.gender, team_member.wieght, team_member.hieght, team_member.side_preference, team_member.active, team_member.emergency_cont]
            )
        ).then(([results])=>{
            console.log("updated team_member with ID: ", results.insertId)
            return results.insertId;
        })
    }
    // -------- Paddlers --------
    /*
    //insert
    public insertPaddler(member: Paddler) : Promise<number>{
        return this.getDB().then( db => 
            db.executeSql(
                'INSERT INTO paddler (team_mamber_id, perfered_side, gender, wieght) VALUES (?,?,?,?)',
                [member.id, member.perfered_side, member.gender, member.wieght])
            ).then(([results]) => {
                console.log("insert paddler with ID: ", results.insertId)
                return results.insertId;
            })
    }

    //get
    public getPaddlerByID(id) : Promise<Paddler>{
       return this.getDB().then( db => 
            db.executeSql('SELECT * FROM paddler WHERE team_member_id = ?;',[id])
            ).then(([results]) => {
                if (results !== undefined){
                    const data = results.rows.item(0);
                    let { team_member_id, perfered_side, gender, wieght, active } = data;
                    active = active > 0; 
                    return new Paddler (team_member_id, perfered_side, gender, wieght, active);
                }
                else 
                    return Promise.reject()
            })
    }
    //get all paddlers
    public getAllPaddlers() : Promise<Paddler[]>{
        return this.getDB().then( db => 
            db.executeSql('SELECT * FROM team_member;')).then(([results]) => {
                if (results !== undefined){
                    let paddlers : Paddler[] = [];
                    for (let i = 0; i < results.rows.length; i++){
                        const data = results.rows.item(i);
                        let { team_member_id, perfered_side, gender, wieght, active } = data;
                        paddlers.push(new Paddler( team_member_id,perfered_side,gender,wieght,active))
                    }
                    return paddlers;
                }
                else 
                    return Promise.reject()
            });
    }
    
    //update 
    public updatePaddler(paddler : Paddler) : Promise<number>{
        return this.getDB().then ( db => 
            db.executeSql(
                'UPDATE paddler SET perfered_side = ?, gender = ?, wieght = ?, active = ?' +
                 '  WHERE team_member_id = ?;',
                 [paddler.perfered_side, paddler.gender, paddler.wieght, paddler.active]
            )
        ).then(([results])=>{
            console.log("updated team_member with ID: ", results.insertId)
            return results.insertId;
        })
    } // 
    // ------- Boat Layout -------
    //insert 
    public insertBoatLayout(layout: Boat_Layout) : Promise<number>{
        return this.getDB().then( db => 
            db.executeSql(
                'INSERT INTO boat_layout (num_paddlers, active, name, date) VALUES (?,?,?,?)',
                [layout.num_paddlers, layout.active, layout.name, layout.date])
            ).then(([results]) => {
                console.log("insert paddler with ID: ", results.insertId)
                return results.insertId;
            })
    }

    //get
    public getBoatLayoutByID(id) : Promise<Boat_Layout>{
       return this.getDB().then( db => 
            db.executeSql('SELECT * FROM boat_layout WHERE layout_id = ?;',[id])
            ).then(([results]) => {
                if (results !== undefined){
                    const data = results.rows.item(0);
                    let { num_paddlers, name, date, active, id} = data;
                    active = active > 0; 
                    return new Boat_Layout (num_paddlers, name,date,active,id, []);
                }
                else 
                    return Promise.reject()
            })
    }
    //get all layouts
    public getAllBoatLayouts() : Promise<Paddler[]>{
        return this.getDB().then( db => 
            db.executeSql('SELECT * FROM Boat_Layout;')).then(([results]) => {
                if (results !== undefined){
                    let paddlers : Boat_Layout[] = [];
                    for (let i = 0; i < results.rows.length; i++){
                        const data = results.rows.item(i);
                        let { num_paddlers, name, date, active, id} = data;
                        paddlers.push(new Boat_Layout( team_member_id,perfered_side,gender,wieght,active))
                    }
                    return paddlers;
                }
                else 
                    return Promise.reject()
            });
    }// */

}
export const db: Database = new db_impl(); 

