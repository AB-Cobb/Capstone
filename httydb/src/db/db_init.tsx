import SQLite from 'react-native-sqlite-storage';

export class db_init {
    public updateTables(db: SQLite.SQLiteDatabase): Promise<void> {
        console.log("db_init updateTables");
        let dbversion: number = 0;
        return db.transaction(this.createTables).then (() => {
            return this.getVersion(db)
        }).then(version => {
            dbversion = version
            console.log ("db version: "+ version);
            if (dbversion == 0){
              db.executeSql('DROP TABLE team_member').then(()=>{
                db.transaction(this.createTables).then(() => {
                  db.executeSql("INSERT INTO version (version) VALUES (1)")
                })
              })
            }
        });
    }


    private createTables(transaction: SQLite.Transaction) {
        console.log("db_init createTables");
        // team members
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS team_member( ' + 
                    '"team_member_id"	INTEGER PRIMARY KEY, ' +
                    '"name" 	TEXT NOT NULL, '+
                    '"email"	TEXT NOT NULL, '+
                    '"phone"	TEXT NOT NULL, '+
                    '"emergency_cont"   TEXT, '+
                    '"gender"   TEXT NOT NULL, '+
                    '"weight"   NUMBER NOT NULL, '+
                    '"height"   NUMBER NOT NULL, '+
                    '"side_preference" TEXT, '+
                    '"active"   NUMBER '+
                    ');'
            );
            //Boat Layout
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS boat_layout( '+
                    'layout_id INTEGER PRIMARY KEY, '+
                    'num_paddlers   INTEGER, '+
                    'active INTEGER NOT NULL, '+
                    'name TEXT, '+
                    'date DATE '+
                ');'  

            )
            //paddler on boat
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS paddler_on_boat( '+
                  '"paddler_on_boat_id"	INTEGER PRIMARY KEY, '+
                  'layout_id INTEGER NOT NULL, '+
                  'team_member_id INTEGER NOT NULL, ' + 
                  'position INTEGER NOT NULL, ' + 
                  'side INTEGER NOT NULL, ' +
                  'FOREIGN KEY(layout_id) REFERENCES boat_layout(layout_id), '+
                  'FOREIGN KEY(team_member_id) REFERENCES team_member(team_member_id) '+
              ');'  
            );//*/
            //race
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS race( '+ 
                  '"race_id" INTEGER PRIMARY KEY, ' +
                  'layout_id INTEGER, '+
                  'name       TEXT' +
                  'race_date  DATE, ' +
                  'duration   FLOAT, ' +
                  'distance   FLOAT, ' +
                  'FOREIGN KEY(layout_id) REFERENCES boat_layout(layout_id) ' +
              ');'
            );
            //map point
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS map_point( '+
                  '"point_id"     INTEGER PRIMARY KEY, '+
                  '"race_id"	   INTEGER ' +
                  '"long"         FLOAT, ' +
                  '"lat"          FLOAT, '+
                  '"timestamp"    datetime, '+
                  'FOREIGN KEY(race_id) REFERENCES race(race_id) ' +
              ');'
            );       // */

            // Version table
            transaction.executeSql(
              'CREATE TABLE IF NOT EXISTS Version( ' +
                'version_id INTEGER PRIMARY KEY NOT NULL, ' +
                'version INTEGER' +
                ');',
    );
  }
  private getVersion(db: SQLite.SQLiteDatabase): Promise<number> {
    return db
      .executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;')
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch(() => {
        return 0;
        // do some error handling
      }); 
  }
}
