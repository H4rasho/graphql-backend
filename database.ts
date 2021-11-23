import { Sequelize } from "sequelize/dist";

export const geslubConn = new Sequelize(process.env.DB_CONNECTION || "");

export const connectDB = async () => {
  try {
    await geslubConn.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
