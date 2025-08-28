

export async function getRecords():Promise<[{"SA_Name":string,"ID":string}]>{
    const data=await fetch("http://127.0.0.1:3000/bom").then((res)=>res.json()).then((res)=>res?.data);
    return data;
}