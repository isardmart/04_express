const express =require('express')

const app=express()

const accounts=[]

app.listen(4040,()=>{
    console.log('serving my master port 4040')
})

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.get('/account/new/:accountID/:amount',(req,res)=>{
    const idx=req.params.accountID*1
    if(!(idx)){
        res.send({ ok: true, data: "Provide a valid ID,f.e: '/account/new/xxxx/amount', every x must be a number " })
    }else if (accounts[idx-1]){
        res.send({ ok: true, data: `Account ${req.params.accountID} already exists` })
    }else{
        let newobj={};
        newobj.id=req.params.accountID;
        newobj.balance=req.params.amount*1;
        accounts[idx-1]=newobj;
        res.send({ ok: true, data: `Account ${req.params.accountID} created with ${req.params.amount} euros` })
    }
})

app.get('/:string',(req,res)=>{
    if(!(req.params.string*1)){
        res.send({ ok: true, data: '404 resource not found' })
    }
})
app.get('/:accountID/withdraw/:amount',(req,res)=>{
    const idx=req.params.accountID*1;
    if(!(idx)){
        res.send({ ok: true, data: '404 resource not found' })
    } else if (accounts[idx-1]){
            if(accounts[idx-1]['balance']>=req.params.amount){
            accounts[idx-1].balance-=req.params.amount;
            res.send({ ok: true, data: `${req.params.amount} euros taken from account num ${req.params.accountID}`})
            } else{
            res.send({ ok: true, data: `${req.params.amount} euros cannot be taken from account num ${req.params.accountID}, you don't have enough money in the account. Your account balance is: $${accounts[idx-1].balance}. Do you want to withdraw everything?` })
            }
    }else{
        res.send({ ok: true, data: 'Account not found' })
        }
})

app.get('/:accountID/deposit/:amount',(req,res)=>{
    const idx=req.params.accountID*1;
    if(!(idx)){
        res.send({ ok: true, data: '404 resource not found' })
    } else if (accounts[idx-1]){
        accounts[idx-1].balance+=req.params.amount*1
        res.send({ ok: true, data: `${req.params.amount} euros added on the account num ${req.params.accountID}` })
            
    }else{
        res.send({ ok: true, data: 'Account not found' })
    }
})

app.get('/:accountID/balance',(req,res)=>{
    const idx=req.params.accountID*1;
    if(!(idx)){
        res.send({ ok: true, data: '404 resource not found' })
    } else if (accounts[idx-1]){
        res.send({ ok: true, data: accounts[idx-1].balance })
            
    }else{
        res.send({ ok: true, data: 'Account not found' })
    }
})
app.get('/:accountID/delete',(req,res)=>{
    const idx=req.params.accountID*1;
    if(!(idx)){
        res.send({ ok: true, data: '404 resource not found' })
    } else if (accounts[idx-1]){
        accounts.splice(idx-1,1)
        res.send({ ok: true, data: `Account num ${req.params.accountID} deleted`})
            
    }else{
        res.send({ ok: true, data: 'Account not found' })
    }
})

/*
        let newobj=accountdefault;
        let maxId=accounts.sort((a, b) => b.id - a.id)[0].id
        let newId=(maxId*1+1).toString();
        while(newId.length<4){
            newId='0'+newId
        }
        console.log(maxId, newId)
        */