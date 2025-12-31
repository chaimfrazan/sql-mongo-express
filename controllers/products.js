export const createProduct = async (req, res) => {
  try {
    const { body } = req;
    const conn = req.mongoDbConn;
    const collection = conn.collection("products");
    if (
      !body.name ||
      !body.description ||
      !body.price ||
      !body.category ||
      !body.stock
    ) {
      res.status(404).json({ massege: "error" });
    }
    const product = await collection.insertOne({
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      stock: body.stock,
    });
    res
      .status(200)
      .json({ massage: `Created product with ${product.insertedId}` });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Product with this name already exists",
      });
    }
  }
};

export const getProducts = async (req, res) => {
  try {
    const conn = req.mongoDbConn;
    const collection = conn.collection("products");
    const prodacts = await collection.find({}).toArray();
    res.status(200).json({ data: prodacts });
  } catch (error) {
    res.status(404).json({ massege: "products not found" });
  }
};

