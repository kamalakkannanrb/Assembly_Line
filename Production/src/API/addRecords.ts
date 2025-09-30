
import { addSAPayload } from "../types";

export async function addSATraceability(payload:addSAPayload){
    const config={
        form_name:"SA_Traceability_Report",
        payload:payload
    }
    // @ts-ignore
    const response=await ZOHO.CREATOR.DATA.addRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(response);
}