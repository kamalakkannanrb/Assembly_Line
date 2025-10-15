
//UtilityFunctions
// import { logError } from "../utilityFunctions/errorLog";

//Types
import { SASequence,Bin,SATraceability } from "../types";

export async function getSABOM():Promise<[{"Part_Name":string,"ID":string,"Version":string}] | null>{
    const config={
        report_name:"Sub_Assembly_BOM_Report_API_Backend",
        max_records:1000
    }

    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);

    // try{
    //     //@ts-ignore
    //     // const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>logError(e,"Sub_Assembly_BOM_Report_API_Backend"));
    //     const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res));
    //     console.log("Error")
    //     if(data?.code!=3000)logError(data?.description,"Sub_Assembly_BOM_Report_API_Backend");
    //     return data?.data?data.data:null;

    // }
    // catch(e:any){
    //     logError(e,"Sub_Assembly_BOM_Report_API_Backend");
    // }
    // if(data?.code!=3000)logError(data?.description,"Sub_Assembly_BOM_Report_API_Backend");
    // return null;

    return data?.data?data.data:null;
}

export async function getSASequence(id:string | undefined):Promise<[SASequence] | null>{
    const config={
        report_name:"SA_Sequence_Master_Report_API_Backend",
        max_records:1000,
        criteria:`(Sub_Assembly_BOM=${id})`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}

export async function getBin(id:string):Promise<[Bin]| null>{
    const config={
        report_name:"Bin_Floating_Data_API_Backend",
        max_records:1000,
        criteria:`(BIN_ID="${id}")`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}

export async function getSATraceability(id:string):Promise<[SATraceability] | null>{
    const config={
        report_name:"All_SA_Traceability_Reports_API_Backend",
        criteria:`SA_Traceability_ID="${id}"`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}

export async function getQC(id:string){
     const config={
        report_name:"QC_Report",
        criteria:`QC_ID="${id}"`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}

