import { DataTypes } from "sequelize/dist";
import { sequelize } from "./database";

export const ContactModel = sequelize.define("contact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
