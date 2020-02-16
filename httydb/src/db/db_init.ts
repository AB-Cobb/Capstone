import SQLite from "react-native-sqlite-storage";

export class db_init {
    public updateTables(db: SQLite.SQLiteDatabase): Promise<void> {
        console.log("db_init updateTables");
        let dbversion: number = 0;
        return db.transaction(this.createTables).then (() => {
            return this.getVersion(db)
        }).then(version => {
            dbversion = version
            console.log ("db version: "+ version);
            //code for updating DB versions go here
        });
    }

    private createTables(transaction: SQLite.Transaction) {
        console.log("db_init createTables");
        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS team_member(' + 
                '"team_member_id"	INTEGER NOT NULL,' +
                '"fname"	TEXT NOT NULL,'+
                '"lname"	TEXT NOT NULL,'+
                '"email"	TEXT,'+
                '"active"	INTEGER NOT NULL,'+
                'PRIMARY KEY("team_member_id")"'+
                '");'
        );
        // Version table
        transaction.executeSql(
            "CREATE TABLE IF NOT EXISTS Version( " +
            "version_id INTEGER PRIMARY KEY NOT NULL, " +
            "version INTEGER" +
            ");"
        );
    }
    private getVersion(db: SQLite.SQLiteDatabase): Promise<number> {
        return db.executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
            .then(([results]) => { 
                if (results.rows && results.rows.length > 0) {
                    const version = results.rows.item(0).version;
                    return version;
                  } else {
                    return 0;
                  }
            }).catch (()=> {return 0 });// do some error handling
    }
}

