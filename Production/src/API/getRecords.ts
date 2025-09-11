
import { SASequence } from "../types";

export async function getSABOM():Promise<[{"Part_Name":string,"ID":string,"Version":string}] | null>{
    const config={
        report_name:"Sub_Assembly_BOM_Report_API_Backend",
        max_records:1000
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.log(e));
    return data?.data?data.data:null;
}

export async function getSASequence(id:string | undefined):Promise<[SASequence] | null>{
    const config={
        report_name:"SA_Sequence_Master_Report_API_Backend",
        max_records:1000,
        criteria:`(Sub_Assembly_BOM=${id})`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.log(e));
    return data?.data?data.data:null;
}

