
//Types
import { updateSAPayload } from "../types";

export async function updateSATraceability(payload:updateSAPayload,id:string){
    const config={
        report_name:"All_SA_Traceability_Reports_API_Backend",
        id:id,
        payload:payload
    }
    //@ts-ignore
    const response=await ZOHO.CREATOR.DATA.updateRecordById(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(response);
}