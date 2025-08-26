
const express=require('express');
const dotenv=require('dotenv')
const cors=require('cors');

dotenv.config();

const app=express();
let accessToken='';

async function fetchAccessToken() {
    try{

    }
    catch(e){
        console.log(e);
    }
}



setInterval(()=>console.log('Restart'),4000);

app.use(cors())

app.get('/',async(req,res)=>{
    console.log(refreshToken);
    res.send("Done!");
});

app.listen(3000,()=>{
    console.log("Server started");
})

/*
ZohoCreator.form.ALL,ZohoCreator.report.ALL,ZohoCreator.meta.form.READ,ZohoCreator.meta.application.READ,ZohoCreator.dashboard.READ
*/