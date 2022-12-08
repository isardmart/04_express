const products = require('../models/products');
const { categories } = require('./category');
class Products{
    async  add (req, res) {
        let { product } = req.body;
        try{
            const done = await products.create({product});
            res.send(done)
        }
        catch(e){
            res.send({e})
        }
        }
    async delete (req,res){
        let { product } = req.body;
        try{
            const done = await products.remove({product});
            res.send(done)
        }
        catch(e){
            res.send({e})
        }
    }
    async update (req,res){
        let { product } = req.body;
        try{
            const done = await products.updateOne({product});
            res.send(done)
        }
        catch(e){
            res.send({e})
        }
    }
    async product(req,res){
        let {prod}=req.params
        try{
            const done =await products.findOne({prod});
            res.send(done)
        }
        catch(e){
            res.send(e)
        }
    }

    async get_all(req,res){
        try{
            const done =await products.find({});
            res.send(done)
        }
        catch(e){
            res.send(e)
        }
    }
} ;  


module.exports =new Products();