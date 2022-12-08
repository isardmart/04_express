const categories = require('../models/categories')

class Categories {
    
    async  add (req, res) {
    let { category } = req.body;
    try{
        const done = await categories.create({category});
        res.send(done)
    }
    catch(e){
        res.send({e})
    }
    }

    async delete (req,res){
        let{category}=req.body;
        try{
            const done =await categories.remove({category})
        }
        catch(e){
            res.send({e})
        }
    }

    async update (req,res){
        let{category}=req.body;
        try{
            const done =await categories.updateOne({category})
        }
        catch(e){
            res.send({e})
        }
    }

    async categories(req,res){
       try{
        const allcategories =await categories.find({});
        res.send( { ok: true, data: [allcategories] })
       }
       catch(e){
        console.log(e)
       }
    }

    async category(req,res){
        let category =req.params.category
        try{
            const done=await categories.find({category})
            res.send( { ok: true, data: [done] })
        }
        catch(e){
            console.log(e)
        }
    }
};

module.exports =new Categories();