
const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

const app=express();
const account_owner_name=process.env.account_owner_name;
const app_link_name=process.env.app_link_name
const client_id=process.env.client_id;
const client_secret=process.env.client_secret;
const refresh_token=process.env.refresh_token;
let accessToken='';
// const header={"Authorization":`Zoho-oauthtoken ${accessToken}`};

async function fetchAccessToken() {
    accessToken=await fetch(`https://accounts.zoho.in/oauth/v2/token?refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}&grant_type=refresh_token`,{method:"POST"}).then((res)=>res.json()).then((res)=>res?.access_token).catch((e)=>console.log(e));
    console.log('\x1b[1m\x1b[34m'+'New token at '+new Date()+' '+accessToken+'\x1b[0m');
}
fetchAccessToken();

setInterval(fetchAccessToken,1000*59*59);

app.use(cors());
app.use(express.json());


app.get('/bom',async(req,res)=>{
    console.log("Requested");
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/Sub_Assembly_BOM_Report_API_Backend`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`}}).then((res)=>res.json()).catch((e)=>console.log(e));
    // const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/Sub_Assembly_BOM_Report_API_Backend`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`}})
    // .then(async res=>{
    //     const r=await res.json();
    //     return r;
    // })
    // .catch(e=>console.log(e));
    res.send(response);
});

app.get('/seq/:id',async(req,res)=>{
    console.log(req.params?.id);
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/SA_Sequence_Master_Report_API_Backend?criteria=Sub_Assembly_BOM=${req.params.id}`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`}}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    res.send(response);
});

app.get('/bin/:id',async (req,res) => {
    console.log(req.params?.id);
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/Bin_Floating_Data_API_Backend?criteria=BIN_ID="${req.params?.id}"`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`}}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    res.send(response);
})

app.post('/SATrace',async(req,res)=>{
    // console.log(req.body);
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/form/SA_Traceability_Report`,{method:"POST",headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`},body:JSON.stringify(req.body)}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    console.log(response);
    res.json({"status":"success"});
});

app.get('/SATrace/:id', async(req,res)=>{
    console.log(req.params?.id); 
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/All_SA_Traceability_Reports_API_Backend?criteria=SA_Traceability_ID="${req.params?.id}"`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`}}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    res.send(response);
});

app.patch('/SATrace/:id',async(req,res)=>{
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/All_SA_Traceability_Reports_API_Backend/${req.params.id}`,{method:"PATCH",headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`},body:JSON.stringify(req.body)}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    console.log(response);
    res.send(response);
})

app.get('/QC/:id',async(req,res)=>{
    console.log(req.params?.id);
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/Super_Market_Master_Report?criteria=QC_ID="${req.params.id}"`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`},body:JSON.stringify(req.body)}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    // console.log(response);
    res.send(response);
})

app.get('/VIN/:id',async(req,res)=>{
    console.log(req.params?.id);
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/Vin_Masters_Report?criteria=VIN_Number="${req.params.id}"`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`},body:JSON.stringify(req.body)}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    // console.log(response);
    res.send(response);
})

app.post('/errorLog',async(req,res)=>{
    // console.log(req.body);
    const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/form/ErrorLog`,{method:"POST",headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`},body:JSON.stringify(req.body)}).then((res)=>res.json()).catch((e)=>console.log(e)); 
    console.log(response);
    res.json({"status":"success"});
});


/*
const response=await fetch(`https://www.zohoapis.in/creator/v2.1/data/${account_owner_name}/${app_link_name}/report/All_SA_BOM_Masters`,{headers:{"Authorization":`Zoho-oauthtoken ${accessToken}`}}).then((res)=>res.json()).catch((e)=>console.log(e)); 
res.send(response);
*/

app.listen(3000,()=>{
    console.log("Server started");
});

/*
ZohoCreator.form.ALL,ZohoCreator.report.ALL,ZohoCreator.meta.form.READ,ZohoCreator.meta.application.READ,ZohoCreator.dashboard.READ
*/