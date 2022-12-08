const express=require('express'),
    app =express(),
    port =4040,
    mongoose =require("mongoose")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

async function connecting(){
    try {
        await mongoose.connect("mongodb+srv://tonigali:oqArtxQ6eOlBUNkj@productsdb.zltowpx.mongodb.net/myFirstDatabase")
        console.log('Connected to the DB')
    } catch ( error ) {
        console.log('ERROR: Seems like your DB is not running, please start it up !!!');
    }
    }
    connecting()


app.use('/product',require('./routes/product'));
app.use('/category',require('./routes/category'))

app.use(require('cors')())
app.listen(port,()=>console.log(`Listening on port: ${port}`))