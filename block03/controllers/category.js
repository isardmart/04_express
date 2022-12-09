const categories = require('../models/categories')
const products = require('../models/products')


class Categories {
    
    async  add (req, res) {
    let { category } = req.body;
    try{
        const done = await categories.create({category});
        res.send({ ok: true, data: `Category ${category} added successfully` });
    }
    catch(e){
        if (categories.findOne({category})){
            res.send({ ok: true, data: `Category ${category} already exists` })
        } else{
        res.send({e})
        }
    }
    }

    async delete (req,res){
        let {category}=req.body;
        try{
            const done =await categories.deleteOne({category});
            if (done.deletedCount===0){
                res.send({ ok: true, data: `Category ${category} doesn't exist` })
            }else{
            res.send({ ok: true, data: `Category ${category} deleted successfully` });
            }            
        }
        catch(e){
            res.send({e})
        }
    }

    async update (req,res){
        let oldcategory=req.body.old_category;
        let newcategory=req.body.new_category;
        try{
            const done =await categories.updateOne(
                {oldcategory},
                {'category':newcategory}
            );
            if (done.modifiedCount==0){
                res.send({ ok: true, data: `Category ${oldcategory} doesn't exist` });
            }else{
            res.send({ ok: true, data: `Category ${newcategory} updated successfully` });
            }
        }
        catch(e){
            res.send({e})
        }
    }

    async categories(req,res){
       try{
        const allcategories =await categories.find({});
        res.send( { ok: true, data: [allcategories.map(value => {return value.category })] })
       }
       catch(e){
        res.send(e)
       }
    }

    async all(req,res){
        try{
            const categoriesDB =await categories.find({});
            const productsDB =await products.find({});
            res.send({ ok: true, data: [categoriesDB.map(value=>{
                let productsarray= productsDB.filter((prod)=>prod.category===value.category)
                return {'category':value.category,'products':productsarray}
            })]})
        }
        catch(e){
            res.send(e)
        }
    }

    async category(req,res){
        let {category} =req.params
        try{
            const categoryDB=await categories.find({category})
            const productsDB=await products.find({category})
            res.send( { ok: true, data: {'category':categoryDB[0].category,'products':productsDB} })
        }
        catch(e){
            res.send(e)
        }
    
    }
};

module.exports =new Categories();