const products = require('../models/products');
const categories = require('../models/categories');
class Products{
    async  add (req, res) {
        let {category,product} = req.body;
        console.log(req.body,category)
        if (categories.find({category})){
        try{
            const done = await products.create({name: product.name,
                price: product.price,
                color: product.color,
                description: product.description,
                category: category});
            res.send({ ok: true, data: `product ${product.name} added successfully` })
        }
        catch(e){
            if (products.find(product)){
                res.send({ ok: true, data: `product ${product.name} already exists` })
            }else{
            res.send({e})
            }
        }}
        else{
            res.send({ ok: true, data: `category ${category} doesn't exists` })
        }
        }
    async delete (req,res){
        let { name } = req.body;
        try{
            const done = await products.deleteOne({name});
            if(done.deletedCount==0){
                res.send({ ok: true, data: `product ${name} doesn't exists` });
            }else{
            res.send({ ok: true, data: `product ${name} deleted successfully` })
            }
        }
        catch(e){
            res.send({e})
        }
    }
    async update (req,res){
        let oldproduct=req.body.old_product;
        let newproduct=req.body.new_product;
        try{
            const done =await products.updateOne(
                {oldproduct},
                {'name':newproduct.name}
            );
            if (done.modifiedCount==0){
                res.send({ ok: true, data: `product ${oldproduct.name} doesn't exists` })
            }else{
            res.send({ ok: true, data: `product ${newproduct.name} updated successfully` });
            }
        }
        catch(e){
            res.send({e})
        }
    }
    async product(req,res){
        let {prod}=req.params
        try{
            const done =await products.findOne({prod});
            res.send({ ok: true, data: [done] })
        }
        catch(e){
            res.send(e)
        }
    }
} ;  


module.exports =new Products();