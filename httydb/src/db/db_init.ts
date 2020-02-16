import SQLite from "react-native-sqlite-storage";

export class db_init {
    public updateTables(db: SQLite.SQLiteDatabase): Promise<void> {
<<<<<<< HEAD
        console.log("db_init updateTables");
=======
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
        let dbversion: number = 0;
        return db.transaction(this.createTables).then (() => {
            return this.getVersion(db)
        }).then(version => {
            dbversion = version
<<<<<<< HEAD
            console.log ("db version: "+ version);
=======
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
            //code for updating DB versions go here
        });
    }

    private createTables(transaction: SQLite.Transaction) {
<<<<<<< HEAD
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
=======
        transaction.executeSql(
            'CREATE TABLE IF NOT EXISTS team_member(' + 
                '"team_member_id"	INTEGER NOT NULL,' +
                '"name"	TEXT NOT NULL,'+
                '"active"	INTEGER NOT NULL,'+
                'PRIMARY KEY("team_member_id")"'+
                '");'
        )
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
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
<<<<<<< HEAD
}

=======
}
>>>>>>> 5ea0f46b003f932ea1bd3c14c8ec344f9feda296
