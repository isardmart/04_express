const express =require('express')

const bodyParser =require ('body-parser')

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


const DB =[]

app.get('/',(req,res)=>{
    res.send('Hello!')
})

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
})

app.post('/category/delete',(req,res)=>{
    let idx=DB.findIndex((element) => element.category === req.body.category);
    if(idx!==-1){
        DB.splice(idx,1);
        res.send({ ok: true, data: `Category ${req.body.category} deleted successfully` })
    }else{
        res.send({ ok: true, data: `Category ${req.body.category} deleted successfully` })
    }
})

app.post('/category/update',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.old_category)
    if(idx!==-1){
        DB[idx].category=req.body.new_category
        res.send({ ok: true, data: `product ${req.body.new_product.name} updated successfully`})
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})
    }
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
})
app.get('/category/products',(req,res)=>{
    res.send({ ok: true, data: DB});

})
app.get('/category/:category',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.params.category);
    if (idx!==-1){
        res.send({ok: true ,data:DB[idx]})
    } else{
        res.send({ok: true ,data:`Category ${req.params.category} not found`})
    }
})
app.post('/product/add',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.category)
    if(idx!==-1){
        DB[idx].products.push(req.body.product)
        res.send({ ok: true, data: `product ${req.body.product['name']} added successfully` })
        console.log(DB)
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})
    }
})
app.post('/product/delete',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.category)
    if(idx!==-1){
        let id=DB[idx].products.findIndex(value=>value.name===req.body.product.name)
        DB[idx].products.splice(id,1)
        res.send({ ok: true, data: `product ${req.body.product.name} deleted successfully` })
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})

    }
})
app.post('/product/update',(req,res)=>{
    let idx=DB.findIndex(value=>value.category===req.body.category)
    if(idx!==-1){
        let id=DB[idx].products.findIndex(value=>value.name===req.body.old_product.name)
        DB[idx].products[id].name=req.body.new_product.name
        res.send({ ok: true, data: `product ${req.body.new_product.name} updated successfully`})
    } else{
        res.send({ ok: true, data: `Category ${req.body.category} not found`})
    }
})
app.listen(4040,()=>{
    console.log('serving on port 4040')
})