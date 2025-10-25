
//Types
import { updateSAPayload } from "../types"

export async function updateSATraceability(payload:updateSAPayload,id:string){
    await fetch(`http://127.0.0.1:3000/SATrace/${id}`,{method:"PATCH",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
}