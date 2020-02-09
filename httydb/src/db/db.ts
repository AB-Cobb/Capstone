import * as React from 'react';
import SQLite from 'react-native-sqlite-storage';
import { Teammate } from '../models/teammate';

interface Props {}
interface State {
  db: SQLite.SQLiteDatabase;
  teammates: Array<Teammate>;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const db = SQLite.openDatabase(
      {
        name: 'teammate.db',
        location: 'default',
        createFromLocation: '../../ios/httydb/www/teammate.db',
      },
      () => {},
      error => {
        console.log(error);
      }
    );

    this.state = {
      db,
      teammates: [],
    };
  }

  render() {
    const { teammates } = this.state;
    return (
        {teammates.map((teammate: Teammate, index: number) => (
            teammate.id,
            teammate.name,
            teammate.active
        ))}
        );
  }

  componentDidMount() {
    const { db } = this.state;

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM teammate;', [], (tx, results) => {
        const rows = results.rows;
        let teammates = [];

        for (let i = 0; i < rows.length; i++) {
            teammates.push({
            ...rows.item(i),
          });
        }

        this.setState({ teammates });
      });
    });
  }

  componentWillUnmount() {
    const { db} = this.state;
    db.close();
  }
}