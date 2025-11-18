
//Types
import { UpdateVINPayload } from "../types/main"

export async function updateVIN(VIN:string,payload:UpdateVINPayload){
    await fetch(`http://127.0.0.1:3000/VIN/${VIN}`,{method:"PATCH",headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
}