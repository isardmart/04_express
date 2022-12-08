const app =require('express')();
const port =4040;
const mongoose =require("mongoose")
app.use(require('express').json());
app.use(require('express').urlencoded({extended:true}));
//tonigali:ODhbmNmEifUawZyG
async function connecting(){
    try {
        await mongoose.connect("mongodb+srv://productsdb.zltowpx.mongodb.net/myFirstDatabase")
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