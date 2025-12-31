import { ObjectId } from "mongodb";

// export const createDb = async (req, res) => {
//   try {
//     const conn = req.mysqlConn;
//     await conn.query(`create database if not exists ecommerce;`);
//     await conn.query(`use ecommerce;`);
//     res.status(200).json({ massage: "created db sucssesfuly" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const createTable = async (req, res) => {
//   try {
//     const conn = req.mysqlConn;
//     await conn.query(`  CREATE TABLE IF NOT EXISTS orders (
//         id INT PRIMARY KEY AUTO_INCREMENT,
//         productId VARCHAR(24) NOT NULL,
//         quantity INT NOT NULL,
//         customerName VARCHAR(255) NOT NULL,
//         totalPrice DECIMAL(10,2) NOT NULL,
//         orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
//       );`);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const createOrder = async (req, res) => {
  try {
    const { body } = req;
    const connMon = req.mongoDbConn;
    const connSql = req.mysqlConn;
    const collection = connMon.collection("products");
    if (!ObjectId.isValid(body.productId)|| !body.quantity || !body.customerName) {
      res.status(404).json({ massege: "error" });
    }

    const product = await collection.findOne({
      _id: new ObjectId(body.productId),
    });
    if (!product) {
      res.status(404).json({ massege: "the product not found" });
    }
    const totalPrice = body.quantity * product.price;
    const [result] = await connSql.query(
      `INSERT INTO orders (productId, quantity, customerName, totalPrice)
       VALUES (?, ?, ?, ?)`,
      [body.productId, body.quantity, body.customerName, totalPrice]
    );
    res.status(200).json({ massage: "added db sucssesfuly" });
  } catch (error) {
      res.status(500).json({ message: "server error" , error: error.message});
    }
};
