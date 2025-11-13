
//Types
import { VIN, MainSequence } from "../types/main";

export async function getVIN(id:string):Promise<[VIN] | null>{
    const data=await fetch(`http://127.0.0.1:3000/VIN/${id}`).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

export async function getMainSequence(bike:string):Promise<[MainSequence] | null>{
    const data=await fetch(`http://127.0.0.1:3000/mainSeq/${bike}`).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}