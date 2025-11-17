
//Types
import { VIN, MainSequence } from "../types/main";

export async function getVIN(id:string):Promise<[VIN] | null>{
    const config={
        report_name:"Vin_Master_Report_API_Backend",
        criteria:`VIN_Number="${id}"`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}

export async function getMainSequence(bike:string):Promise<[MainSequence] | null>{
    const config={
        report_name:"Main_Sequence_Master_Report_API_Backend",
        criteria:`Bike_Name="${bike}"`
    }
    //@ts-ignore
    const data=await ZOHO.CREATOR.DATA.getRecords(config).then(res=>JSON.stringify(res)).then(res=>JSON.parse(res)).catch(e=>console.error(e));
    console.log(data);
    return data?.data?data.data:null;
}