const products = require("../models/products");
const categories = require("../models/categories");
class Products {
  async add(req, res) {
    const { category, product } = req.body;
    const { name, price, color, description, prodCategory } = product;
    try {
      const categoryfound = await categories.find({ category });
      if (categoryfound[0]) {
        const done = await products.create({
          name: name,
          price: price,
          color: color,
          description: description,
          category: prodCategory,
        });
        res.send({
          ok: true,
          data: `product ${name} added successfully`,
        });
      } else {
        res.send({ ok: true, data: `category ${category} doesn't exists` });
      }
      const productfound = await products.findOne({ name });
      if (productfound) {
        res.send({ ok: true, data: `product ${name} already exists` });
      }
    } catch (e) {
      res.send({ e });
    }
  }
  async delete(req, res) {
    let { name } = req.body;
    try {
      const done = await products.findOneAndRemove({ name });
      if (done.deletedCount == 0) {
        res.send({ ok: true, data: `product ${name} doesn't exists` });
      } else {
        res.send({ ok: true, data: `product ${name} deleted successfully` });
      }
    } catch (e) {
      res.send({ e });
    }
  }
  async update(req, res) {
    const { oldproduct, newproduct } = req.body;
    try {
      const found = await products.findOneAndRemove(
        { oldproduct },
        { name: newproduct.name }
      );
      if (found) {
        res.send({
          ok: true,
          data: `product ${oldproduct.name} doesn't exists`,
        });
      } else {
        res.send({
          ok: true,
          data: `product ${newproduct.name} updated successfully`,
        });
      }
    } catch (e) {
      res.send({ e });
    }
  }
  async product(req, res) {
    let { product } = req.params;
    try {
      const found = await products.findOne({ name: product });
      if (found) {
        res.send(found);
      } else {
        res.send({ ok: true, data: `Product ${product} doesn't exist` });
      }
    } catch (e) {
      res.send(e);
    }
  }
}

module.exports = new Products();
