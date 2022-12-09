const products = require("../models/products");
const categories = require("../models/categories");
class Products {
  async add(req, res) {
    const { category, product } = req.body;
    try {
      const categoryfound = await categories.find({ category });
      if (categoryfound[0]) {
        const done = await products.create({
          name: product.name,
          price: product.price,
          color: product.color,
          description: product.description,
          category: category,
        });
        res.send({
          ok: true,
          data: `product ${product.name} added successfully`,
        });
      } else {
        res.send({ ok: true, data: `category ${category} doesn't exists` });
      }
    } catch (e) {
      const allproducts = await products.find({});
      const don = allproducts.map((value) => {
        if (value.name == product.name) {
          return true;
        }
      });
      if (don) {
        res.send({ ok: true, data: `product ${product.name} already exists` });
      } else {
        res.send({ e });
      }
    }
  }
  async delete(req, res) {
    let { name } = req.body;
    try {
      const done = await products.deleteOne({ name });
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
    let oldproduct = req.body.old_product;
    let newproduct = req.body.new_product;
    try {
      const done = await products.updateOne(
        { oldproduct },
        { name: newproduct.name }
      );
      if (done.modifiedCount == 0) {
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
    let {product} = req.params;
    try {
      const done = await products.findOne({ name: product });
      console.log(done)
      if (done){
        console.log('isempty')
        res.send(done)
      }else{
      res.send({ ok: true, data: `Product ${product} doesn't exist` });
      }
    } catch (e) {
      res.send(e);
    }
  }
}

module.exports = new Products();
