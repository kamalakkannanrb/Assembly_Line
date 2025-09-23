
//Types
import { payload } from "../types"

export async function addSATraceability(payload:payload){
    await fetch("http://127.0.0.1:3000/trace",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
}