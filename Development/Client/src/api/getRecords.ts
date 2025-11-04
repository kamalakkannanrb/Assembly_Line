
// UtilityFunctions
// import { logError } from "../utilityFunctions/errorLog";

//Types
import { SASequence,Bin,SATraceability, QC } from "../types";

export async function getSABOM():Promise<{"Part_Name":string,"ID":string,"Version":string}[] | null>{
    const data=await fetch("http://127.0.0.1:3000/bom").then((res)=>res.json()).catch(e=>console.error(e));
    
    // const data=await fetch("http://127.0.0.1:3000/bom").then((res)=>res.json()).catch(e=>logError(e,"Sub_Assembly_BOM_Report_API_Backend"));

    // if(data?.code!=3000)logError(data?.description,"Sub_Assembly_BOM_Report_API_Backend");
    return data?.data?data.data:null;
}

export async function getSASequence(id:string | undefined):Promise<[SASequence] | null>{
    const data=await fetch(`http://127.0.0.1:3000/seq/${id}`).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

export async function getBin(id:string):Promise<[Bin]| null>{
    const data=await fetch(`http://127.0.0.1:3000/bin/${id}`).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

export async function getSATraceability(stikcer:string):Promise<[SATraceability] | null>{
    const id=encodeURIComponent(stikcer);
    const data=await fetch(`http://127.0.0.1:3000/SATrace/${id}`,{}).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

export async function getQC(id:string):Promise<[QC] | null> {
    const data=await fetch(`http://127.0.0.1:3000/QC/${id}`).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

