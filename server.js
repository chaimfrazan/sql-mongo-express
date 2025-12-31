import { initSqlDb } from "./utils/mysql.js";
import { initMongoDb, getMongoDbConnection } from "./utils/mongodb.js";
import express from "express";
import product  from "./routes/products.js";
import orders from "./routes/orders.js"

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use(async (req, res, next) => {
  req.mysqlConn = await initSqlDb();
  req.mongoDbConn = await getMongoDbConnection();
  next();
});

app.use("/", orders);
app.use("/", product);


app.listen(PORT, async () => {
    await initMongoDb();
    await initSqlDb();
  console.log(`Server is running on port ${PORT}...`);
});
