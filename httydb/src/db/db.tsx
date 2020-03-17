import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

import {db_init} from './db_init';
import {Team_member} from '../models/team_member';
import {Boat_Layout} from '../models/boat_layout';
import {Map_Point} from '../models/map_point';
import {Paddler} from '../models/paddler';
import {Race} from '../models/race';
import {PaddleronBoat} from '../models/paddler_on_boat';

interface Database {
  open(): Promise<SQLite.SQLiteDatabase>;
  close(): Promise<void>;
  getDB(): Promise<SQLiteDatabase>;
  getTeammemberByID(id: number): Promise<Team_member>;
  insertTeammember(Team_member: Team_member): Promise<number>;
  getAllTeammembers(): Promise<Team_member[]>;
  updateTeammamber(team_member: Team_member): Promise<number>;
  removePaddlerOnBoat(paddler: Paddler, boat: Boat_Layout): Promise <void>;
  insertBoatLayout(layout: Boat_Layout) : Promise<number>;
  getBoatLayoutByID(id) : Promise<Boat_Layout>;
  getRecentBoatLayouts(num) : Promise<Boat_Layout[]>;
  insertMapPoint (map_point: Map_Point, race : Race) : Promise <number>;
  getMapPointsByRace (race_id : number) : Promise <Map_Point[]>;
}

class db_impl implements Database {
  private db_name = 'dragon_boat.db';
  private db: SQLite.SQLiteDatabase | undefined;

  public open(): Promise<SQLite.SQLiteDatabase> {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    let dbInstance: SQLite.SQLiteDatabase;
    return SQLite.openDatabase({
      name: this.db_name,
      location: 'default',
    })
      .then(database => {
        dbInstance = database;
        //initialise DB
        const init = new db_init();
        return init.updateTables(dbInstance);
      })
      .then(() => {
        this.db = dbInstance;
        return dbInstance;
      });
  }
  public close(): Promise<void> {
    if (this.db !== undefined) {
      return this.db.close().then(() => (this.db = undefined));
    }
  }
  public getDB(): Promise<SQLite.SQLiteDatabase> {
    if (this.db !== undefined) {
      return Promise.resolve(this.db);
    }
    console.log('getDB(): opening DB');
    return this.open();
  }

  //CRUD opperations

  // ------ TEAM MEMBER ------
  //insert
  public insertTeammember(team_member: Team_member): Promise<number> {
    return this.getDB()
      .then(db =>
        db.executeSql(
          'INSERT INTO team_member (name, email, phone, gender, weight, height, side_preference, active, emergency_cont) VALUES (?,?,?,?,?,?,?,?,?);',
          [
            team_member.name,
            team_member.email,
            team_member.phone,
            team_member.gender,
            team_member.weight,
            team_member.height,
            team_member.side_preference,
            team_member.active,
            team_member.emergency_cont
          ]
        ),
      )
      .then(([results]) => {
        console.log('insert team_member with ID: ', results.insertId);
        return results.insertId;
      });
  }

  //get
  public getTeammemberByID(id): Promise<Team_member> {
    return this.getDB()
      .then(db =>
        db.executeSql('SELECT * FROM team_members WHERE team_member_id = ?;', [
          id,
        ]),
      )
      .then(([results]) => {
        if (results !== undefined) {
          const data = results.rows.item(0);
          let {
            name,
            email,
            phone,
            gender,
            weight,
            height,
            side_preference,
            active,
            emergency_cont,
            teammember_id,
          } = data;
          active = active > 0;
          return new Team_member(
            name,
            email,
            phone,
            gender,
            weight,
            height,
            side_preference,
            active,
            emergency_cont,
            teammember_id,
          );
        } else return Promise.reject();
      });
  }
  //get all teammates
  public getAllTeammembers(): Promise<Team_member[]> {
    return this.getDB()
      .then(db => db.executeSql('SELECT * FROM team_member;'))
      .then(([results]) => {
        if (results !== undefined) {
          let team_members: Team_member[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            const data = results.rows.item(i);
            let {
              name,
              email,
              phone,
              gender,
              weight,
              height,
              side_preference,
              active,
              emergency_cont,
              team_member_id,
            } = data;
            team_members.push(
              new Team_member(
                name,
                email,
                phone,
                gender,
                weight,
                height,
                side_preference,
                active,
                emergency_cont,
                team_member_id
              ),
            );
          }
          return team_members;
        } else return Promise.reject();
      });
  }

  //update
  public updateTeammamber(team_member: Team_member): Promise<number> {
    return this.getDB()
      .then(db =>
        db.executeSql(
          'UPDATE team_member SET name = ?, email = ?, phone = ?, gender = ?, wieght = ?, hieght = ? , side_preference = ?, active = ?, emergency_cont =?' +
            '  WHERE team_member_id = ?;',
          [
            team_member.name,
            team_member.email,
            team_member.phone,
            team_member.gender,
            team_member.weight,
            team_member.height,
            team_member.side_preference,
            team_member.active,
            team_member.emergency_cont,
            team_member.id
          ],
        ),
      )
      .then(([results]) => {
        console.log('updated team_member with ID: ', results.insertId);
        return results.insertId;
      });
  }
  //update
  public removeTeammamber(team_member: Team_member): Promise<number> {
    return this.getDB()
      .then(db =>
        db.executeSql(
          'UPDATE team_member SET active = 0' +
            '  WHERE team_member_id = ?;',
          [
            team_member.id
          ],
        ),
      )
      .then(([results]) => {
        console.log('updated team_member with ID: ', results.insertId);
        return results.insertId;
      });
  }
    // ------- Paddler On Boat ---
    //get
    public getPaddlersOnBoat(id): Promise<Team_member[][]> {
      return this.getDB()
        .then(db =>
          db.executeSql('SELECT * FROM team_member as tm '+
            'JOIN paddler_on_boat as pob ON tm.team_member_id = pob.team_member_id '+
            'WHERE layout_id = ?;', [
            id,
          ]),
        )
        .then(([results]) => {
          if (results !== undefined) {
            let paddlers: Team_member[][];
            for (let i = 0; i < results.rows.length; i++) {
              const data = results.rows.item(i);
              let {
                team_member_id,
                position,
                side,
                name,
                email,
                phone,
                gender,
                weight,
                height,
                side_preference,
                active,
                emergency_cont,
              } = data;
              paddlers[side][position] = 
                new Team_member(
                  name,
                  email,
                  phone,
                  gender,
                  weight,
                  height,
                  side_preference,
                  active,
                  emergency_cont,
                  team_member_id,
                );
            }
            return paddlers;
          } else return Promise.reject();
        });
    }//*/
    //insert
    public insertPaddlerOnBoat(paddler: PaddleronBoat): Promise<void> {
      return this.getDB()
        .then(db =>
          db.executeSql(
            'INSERT INTO paddler_on_boat (layout_id, team_member_id, position, side) VALUES (?,?,?,?)',
            [
              paddler.layout_id,
              paddler.team_member_id,
              paddler.row,
              paddler.side
            ],
          ),
        )
        .then(() => {
          console.log('insert paddler on boat ');
          return;
        });
    }
    //remove
    public removePaddlerOnBoat(paddler: Paddler, boat: Boat_Layout): Promise <void> {
      return this.getDB()
        .then(db =>
          db.executeSql(
            'DELETE FROM paddler_on_boat WHERE team_member_id=? AND layout_id=?',
            [
              paddler.id,
              boat.id
            ]
          )
        )
        .then(() => {
          console.log('remove paddler from boat')
          return;
        });
    }

    // ------- Boat Layout -------
    //insert 
    public insertBoatLayout(layout: Boat_Layout) : Promise<number>{
        return this.getDB().then( db => 
            db.executeSql(
                'INSERT INTO boat_layout (num_paddlers, active, name, date) VALUES (?,?,?,?)',
                [layout.num_paddlers, layout.active, layout.name, layout.date])
            ).then(([results]) => {
                console.log("insert boatlayout with ID: ", results.insertId)
                return results.insertId;
            }).then ((id) =>{
              let paddlers = layout.paddlers;
              for (let i = 0; i < 2; i++){
                for (let j = 0; j < layout.num_paddlers; j++){
                  let paddler = paddlers[i][j]
                  this.insertPaddlerOnBoat(new PaddleronBoat(id, paddler.id, i,j))
                }
               console.log ("add paddler to boat")
              }
              return id;
            });
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
                    let layout = new Boat_Layout (num_paddlers, name,date,active,id) 

                    return layout;
                }
                else 
                    return Promise.reject()
            }).then ((layout) =>{
              return this.getPaddlersOnBoat(layout.id).then((paddlersonboat) => {
                layout.paddlers = paddlersonboat;
                return layout
              })
            })
    }//*/
    //get all
    public getallBoatLayouts() : Promise<Boat_Layout[]>{
      return this.getDB().then( db => 
          db.executeSql('SELECT * FROM Boat_Layout ORDER BY date ;')).then(([results]) => {
              if (results !== undefined){
                  let layouts : [ Promise<Boat_Layout>];
                  for (let i = 0; i < results.rows.length; i++){
                    layouts.push(this.getBoatLayouts_helper(results.rows.item(i)))
                  }
                  Promise.all(layouts).then (()=>{
                    return layouts;
                    }
                  )
              }
              else 
                  return Promise.reject()
          });// */
        }
    //get most recent layouts
    public getRecentBoatLayouts(num = 3) : Promise<Boat_Layout[]>{
        return this.getDB().then( db => 
            db.executeSql('SELECT * FROM Boat_Layout ORDER BY date LIMIT ?;', [num])).then(([results]) => {
                if (results !== undefined){
                    let layouts : [ Promise<Boat_Layout>];
                    for (let i = 0; i < results.rows.length; i++){
                      layouts.push(this.getBoatLayouts_helper(results.rows.item(i)))
                    }
                    Promise.all(layouts).then (()=>{
                      return layouts;
                      }
                    )
                }
                else 
                    return Promise.reject()
            });// */
          }
    private getBoatLayouts_helper(data : { num_paddlers, name, date, active, id}) : Promise<Boat_Layout>{
        let layout : Boat_Layout = new Boat_Layout(
          data.num_paddlers,
          data.name,
          data.date,
          data.active,
          data.id)
          return this.getPaddlersOnBoat(data.id).then(paddlers => {
            layout.paddlers = paddlers;
            return layout;
          });
    }
    //map point
    //instert
    public insertMapPoint (map_point: Map_Point, race : Race) : Promise <number>{
      return this.getDB()
        .then(db => 
          db.executeSql(
            'INSERT INTO map_point (race_id, long, lat, timestamp) values (?,?,?);',
            [
              race.id,
              map_point.long,
              map_point.lat,
              map_point.timestamp
            ]
          )
        ).then(([results]) => {
          console.log('iserted map point');
          return results.insertId;
        })
    }
    //get by race 
    public getMapPointsByRace (race_id : number) : Promise <Map_Point[]>{
      return this.getDB()
        .then(db =>
            db.executeSql ('SELECT * FROM map_point WHERE race_id = ? ORDER BY timestamp',[
              race_id
            ])
          )
        .then(([results]) => {
          if (results !== undefined){
            let map_points : Map_Point[]= []
            for (let i = 0; i < results.rows.length; i++){
              const data = results.rows.item(i)
              let {timestamp,
                 lat,
                long
              } = data;
              map_points.push(
                new Map_Point(
                  timestamp,
                  lat,
                  long
                )
              ) 
            }
            return map_points
          } else return Promise.reject();
        })
    }
    // race 
    //insert
    public insertRace (race : Race) : Promise<number> {
      return this.getDB().then( db =>
        db.executeSql(
          'INSERT INTO race (layout_id, date, name, duration, distance) VALUES (?,?,?,?,?)',[
            race.layout.id,
            race.date,
            race.name,
            race.duration,
            race.duration
          ]
        ).then(([results]) => {
          console.log("insert race with ID: ", results.insertId)
          return results.insertId;
        }).then((id) => {
          race.map_points.forEach( point => this.insertMapPoint(point, race))
          return id
        })
        )
    }

    //get
    public getRaceById (id) : Promise<Race>{
      return this.getDB().then( db =>
        db.executeSql('SELECT * FROM race WHERE r.race_id = ?')
        ).then (([results]) => {
          if (results != undefined){
            const data = results.rows.item(0);
            let {
              layout_id,
              date,
              name,
              duration,
              distance,
              race_id
            } = data;
            return new Race(
              date, name, distance, duration, race_id)
          } else return Promise.reject();
        }).then ( race =>{
          return this.getMapPointsByRace(race.id).then( map_points =>{
            race.map_points = map_points;
            return race;
          })
        })
    }
    //get all
    public getAllRaces() : Promise<Race[]>{
      return this.getDB().then( db =>
        db.executeSql('SELECT * FROM race ORDER BY race_date')).then(([results]) => {
          if (results !== undefined){
            let races : [Promise<Race>]
            for (let i = 0; i < results.rows.length; i++){
              races.push(this.getRaces_helper(results.rows.item(i)))
            }
            Promise.all(races).then(()=>{
              return races
            })
          } else return Promise.reject()
        });
    } 
    private getRaces_helper (data) : Promise<Race>{
      let race : Race = new Race(data.date, data.distance,data.duration, data.id)
      return this.getMapPointsByRace(data.id).then((map_points) => {
        race.map_points = map_points
        return this.getBoatLayoutByID(data.layout_id).then((layout) => {
          race.layout = layout
          return race;
        })
      })
    }
    //get most recent
    public getRecentRaces(num = 3) : Promise<Race[]>{
      return this.getDB().then( db =>
        db.executeSql('SELECT * FROM race ORDER BY race_date LIMIT ?', [num])).then(([results]) => {
          if (results !== undefined){
            let races : [Promise<Race>]
            for (let i = 0; i < results.rows.length; i++){
              races.push(this.getRaces_helper(results.rows.item(i)))
            }
            Promise.all(races).then(()=>{
              return races
            })
          } else return Promise.reject()
        });
    } 
    //get by layout
    public getRace (id) : Promise<Race>{
      return this.getDB().then( db =>
        db.executeSql('SELECT * FROM race WHERE r.race_id = ?')
        ).then (([results]) => {
          if (results != undefined){
            const data = results.rows.item(0);
            let {
              layout_id,
              name,
              date,
              duration,
              distance,
              race_id
            } = data;
            return new Race(
              date, name, distance, duration, race_id)
          } else return Promise.reject();
        }).then ( race =>{
          return this.getMapPointsByRace(race.id).then( map_points =>{
            race.map_points = map_points;
            return race;
          })
        })
    }
}

export const db: Database = new db_impl();
