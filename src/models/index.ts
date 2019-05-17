import * as fs from 'fs';
import * as path from 'path';
import Sequelize from 'sequelize';

import { DbConnection } from '../interfaces/DbConnectionInterface';
let db: any = null;

if (!db) {
  db = getDbConnection();
}

export default db as DbConnection;

export class SQLDataSource {
  protected static db: DbConnection;
  constructor() {
    if (!!SQLDataSource.db) {
      SQLDataSource.db = getDbConnection();
    }
  }
}

function getDbConnection(): DbConnection {
  const basename: string = path.basename(module.filename);
  const env: string = process.env.NODE_ENV || 'development';
  let config = require(path.resolve(`${__dirname}./../config/db_config.json`))[env];

  const db = {};

  const operatorsAliases = {
    $in: Sequelize.Op.in,
  };

  config = Object.assign({ operatorsAliases }, config);

  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );

  fs.readdirSync(__dirname)
    .filter((file: string) => {
      const fileSlice: string = file.slice(-3);
      return (
        file.indexOf('.') !== 0 && file !== basename && (fileSlice === '.js' || fileSlice === '.ts')
      );
    })
    .forEach((file: string) => {
      const model: any = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;
  return db as DbConnection;
}
