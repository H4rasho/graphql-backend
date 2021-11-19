import { Sequelize } from "sequelize/dist";

export const sequelize = new Sequelize(process.env.DB_CONNECTION || "");

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
