
//Type
import { UpdateVINPayload } from "../types/main";

export async function updateVIN(VIN:string,payload:UpdateVINPayload){
    const config={
        report_name:"Vin_Master_Report_API_Backend",
        id:VIN,
        payload:payload
    }
    //@ts-ignore
    const response=await ZOHO.CREATOR.DATA.updateRecordById(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(response);
}