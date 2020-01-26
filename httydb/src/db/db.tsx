import SQLite from "react-native-sqlite-storage";
import { db_init } from "./db_init";
import {Team_member} from "../models/team-member"

export interface Database {
    open(): Promise<SQLite.SQLiteDatabase>;
    close(): Promise<void>;
    get_teammemberByID(id) : Promise<Team_member>
}

class db_impl {
    private db_name = "dragon_boat.db";
    private db: SQLite.SQLiteDatabase | undefined;

    public open(): Promise <SQLite.SQLiteDatabase>{
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        let dbInst: SQLite.SQLiteDatabase;
        return SQLite.openDatabase({
            name: this.db_name,
            location: "default"
          }).then(database => {
              dbInst = database;
              //initialise DB if needed
              const init = new db_init();
              return init.updateTables(dbInst);
          }).then (() => {
              this.db = dbInst;
              return dbInst;
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
    public get_teammemberByID(id) : Promise<Team_member>{
       return this.getDB().then( db => 
            db.executeSql('SELECT * FROM team_members WHERE id = ?;',[id])
            ).then(([results]) => {
                if (results !== undefined){
                    const data = results.rows.item(0);
                    let { fname, lname, email, id } = data;
                    return new Team_member(fname, lname, email, id);
                }
                else 
                    return Promise.reject()
            })
    }
}
export const db: Database = new db_impl();