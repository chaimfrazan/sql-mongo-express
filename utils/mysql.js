import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function initSqlDb() {
  try {
      console.log("connected to sql");
      await connection.query(`create database if not exists ecommerce;`);
      await connection.query(`use ecommerce;`);
      await connection.query(`  CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productId VARCHAR(24) NOT NULL,
        quantity INT NOT NULL,
        customerName VARCHAR(255) NOT NULL,
        totalPrice DECIMAL(10,2) NOT NULL,
        orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
        );`);
    } catch (error) {
        console.log(error.message);
    }
};

export async function getMysqlConnection() {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME,
    });
    return connection
}