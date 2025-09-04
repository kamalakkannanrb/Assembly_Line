
import { SASequence } from "../types";

export async function getSABOM():Promise<[{"Part_Name":string,"ID":string,"Version":String}]>{
    const data=await fetch("http://127.0.0.1:3000/bom").then((res)=>res.json()).then((res)=>res?.data).catch(e=>console.log(e));
    return data;
}

export async function getSASequence(id:String):Promise<[SASequence]>{
    const data=await fetch(`http://127.0.0.1:3000/seq/${id}`).then((res)=>res.json()).then((res)=>res?.data).catch(e=>console.log(e));
    return data;
}

