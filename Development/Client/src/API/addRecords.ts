
//Types
import { addSAPayload } from "../types"

export async function addSATraceability(payload:addSAPayload){
    await fetch("http://127.0.0.1:3000/SATrace",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
}