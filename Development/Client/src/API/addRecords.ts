
//Types
import { addSAPayload,addErrorPayload,AddRedTagPayload } from "../types"

export async function addSATraceability(payload:addSAPayload){
    await fetch("http://127.0.0.1:3000/SATrace",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
}

export async function addError(payload:addErrorPayload){
    await fetch("http://127.0.0.1:3000/errorLog",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
}

export async function addRedTag(QCID:AddRedTagPayload){
    await fetch("http://127.0.0.1:3000/redtag",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(QCID)})
}