const categories = require("../models/categories");
const products = require("../models/products");

class Categories {
  async add(req, res) {
    let { category } = req.body;
    try {
      const found = await categories.findOne({ category });
      if (found) {
        res.send({ ok: true, data: `Category ${category} already exists` });
      }else{
        await categories.create({ category });
        res.send({ ok: true, data: `Category ${category} added successfully` });
      }
    } catch (e) {
      res.send({ ok: false, data: { e } });
    }
  }

  async delete(req, res) {
    let { category } = req.body;
    try {
      const done = await categories.findOneAndRemove({ category });
      if (done) {
        await products.deleteMany({ category });
        res.send({
          ok: true,
          data: `Category ${category} deleted successfully`,
        });
        } else {
          res.send({ ok: true, data: `Category ${category} doesn't exist` });
      }
    } catch (e) {
      res.send({ ok: false, data: { e } });
    }
  }

  async update(req, res) {
    const{old_category,new_category}=req.body;
    try {
      const updated = await categories.findOneAndUpdate(
        { old_category },
        { category: new_category }
      );
      if (updated.modifiedCount == 0) {
        res.send({ ok: true, data: `Category ${old_category} doesn't exist` });
      } else {
        res.send({
          ok: true,
          data: `Category ${new_category} updated successfully`,
        });
      }
    } catch (e) {
      res.send({ ok: false, data: { e } });
    }
  }

  async categories(req, res) {
    try {
      const allcategories = await categories.find({});
      res.send({
        ok: true,
        data: [
          allcategories.map((value) => {
            return value.category;
          }),
        ],
      });
    } catch (e) {
      res.send({ ok: false, data: { e } });
    }
  }

  async all(req, res) {
    try {
      const categoriesDB = await categories.find({});
      const productsDB = await products.find({});
      res.send({
        ok: true,
        data: [
          categoriesDB.map((value) => {
            let productsarray = productsDB.filter(
              (prod) => prod.category === value.category
            );
            return { category: value.category, products: productsarray };
          }),
        ],
      });
    } catch (e) {
      res.send({ ok: false, data: { e } });
    }
  }

  async category(req, res) {
    let { category } = req.params;
    try {
      const found = await categories.findOne({ category });
      if (found) {
        res.send({ ok: true, data: `Category ${category} doesn't exist` });
      }else{
      const categoryDB = await categories.find({ category });
      const productsDB = await products.find({ category });
      res.send({
        ok: true,
        data: { category: categoryDB[0].category, products: productsDB },
      });
    }
      
    } catch (e) {
      res.send({ ok: false, data: { e } })
    }
  }
}

module.exports = new Categories();
