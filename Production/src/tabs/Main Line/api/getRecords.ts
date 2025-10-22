
//Types
import { VIN } from "../types/main";

export async function getVIN(id:string):Promise<[VIN] | null>{
    const config={
        report_name:"Vin_Masters_Report",
        criteria:`VIN_Number="${id}"`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}