
import { useContext, useEffect, useState } from "react"

//API
import { getVIN } from "../../api/getRecords"

//Context
import { MasterContext } from "../../../../context/context"

//Types
import { VIN } from "../../types/main"

export function Scanner(){
    return(
        <div>
            <input type="text" className="bg-white text-center" placeholder="Scanner" autoFocus></input>
        </div>
    )
}

export function List(){
    const master=useContext(MasterContext)
    const[data,setData]=useState<VIN | null>(null);
    useEffect(()=>{
        (async()=>{
            if(master?.["Main Line"]){
                const data:[VIN] | null=await getVIN(master?.["Main Line"]);
                console.log(data);
                data && setData(data[0]);
            }
        }
        )()

    },[])
    return(
        <div>
            <ul>
                {data?.Traceability && data.Traceability.map((ele,index)=>(<li key={index}>{ele.Part?.Part_Name} - {ele.Sub_Assembly_BOM.Part_Name}</li>))}
            </ul>
        </div>
    )
}