import Sequelize from "sequelize";
import mysqlConfig from "./config/config.json" assert { type: "json" };

export { Sequelize };

const db = [];

export const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.username,
  mysqlConfig.password,
  mysqlConfig
);
