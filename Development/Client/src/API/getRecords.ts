
import { SASequence } from "../types";

export async function getSABOM():Promise<[{"Part_Name":string,"ID":string,"Version":string}] | null>{
    const data=await fetch("http://127.0.0.1:3000/bom").then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

export async function getSASequence(id:string | undefined):Promise<[SASequence] | null>{
    const data=await fetch(`http://127.0.0.1:3000/seq/${id}`).then((res)=>res.json()).catch(e=>console.error(e));
    return data?.data?data.data:null;
}

