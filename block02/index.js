const express =require('express')

const bodyParser =require ('body-parser')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const DB =[]

app.post('/category/add',(req,res)=>{
    if(DB.findIndex((element) => element.category === req.body.category)===-1){
        let newcat={};
        newcat['category']=req.body.category;
        newcat['products']=[];
        DB.push(newcat);
        res.send({ ok: true, data: `Category ${req.body.category} added successfully` })
    }else{
        res.send({ ok: true, data: `Category ${req.body.category} already exists` })
    }
    console.log(DB);

})

app.post('/category/delete',(req,res)=>{
    let idx=DB.findIndex((element) => element.category === req.body.category);
    if(idx!==-1){
        DB.splice(idx,1);
        res.send({ ok: true, data: `Category ${req.body.category} deleted successfully` })
    }else{
        res.send({ ok: true, data: `Category ${req.body.category} deleted successfully` })
    }
    console.log(DB);
})

app.post('/category/update',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.old_category)
    if(idx!==-1){
        DB[idx].category=req.body.new_category
        res.send({ ok: true, data: `product ${req.body.new_product.name} updated successfully`})
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})
    }
    console.log(DB);
})
app.get('/category/categories',(req,res)=>{
    let categories = '';
    DB.forEach((element,idx) => {
        if (idx==0){categories=element.category;}
        else{
            categories+=','+element.category;
        }
    });
    res.send({ ok: true, data: categories});
    console.log(DB);
})
app.get('/category/products',(req,res)=>{
    res.send({ ok: true, data: DB});
    console.log(DB);
})
app.get('/category/:category',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.params.category);
    if (idx!==-1){
        res.send({ok: true ,data:DB[idx]})
    } else{
        res.send({ok: true ,data:`Category ${req.params.category} not found`})
    }
    console.log(DB);
})
app.post('/product/add',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.category)
    if(idx!==-1){
        let prod=JSON.parse(req.body.product);
        DB[idx].products.push(prod)
        res.send({ ok: true, data: `product ${prod.name} added successfully` })
        console.log(DB)
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})
    }
    console.log(DB);
})
app.post('/product/delete',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.category)
    if(idx!==-1){
        let prod=JSON.parse(req.body.product)
        let id=DB[idx].products.findIndex(value=>value.name===prod.name)
        DB[idx].products.splice(id,1)
        res.send({ ok: true, data: `product ${prod.name} deleted successfully` })
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})

    }
    console.log(DB);
})
app.post('/product/update',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.category)
    if(idx!==-1){
        let oldprod=JSON.parse(req.body.old_product)
        console.log(oldprod)
        let newprod=JSON.parse(req.body.new_product)
        console.log(newprod)
        let id=DB[idx].products.findIndex(value=>value.name===oldprod.name)
        console.log(id)
        DB[idx].products[id].name=newprod.name
        console.log(DB[idx].products[id],DB[idx].products[id].name)
        res.send({ ok: true, data: `product ${newprod.name} updated successfully`})
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})
    }
    console.log(DB);
})
app.listen(4040,()=>{
    console.log('serving on port 4040')
})