
//Types
import { updateSAPayload } from "../types"

export async function updateSATraceability(payload:updateSAPayload):Promise<{"success":"true" | "false","data":{"Part_ID": string,"QC_ID": string,"QC_Name":string,"Quantity": string}[]}>{
    const data=await fetch(`http://127.0.0.1:3000/SATrace`,{method:"PATCH",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).then((res)=>res.json());
    return data;
}