
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
            <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-25 mx-auto mb-5 rounded-2xl"/>
            <input type="text" className="p-1 bg-white text-center rounded-2xl" placeholder="Scanner" autoFocus></input>
        </div>
    )
}

export function List(){
    const master=useContext(MasterContext)
    const[data,setData]=useState<VIN | null>(null);
    useEffect(()=>{
        (async()=>{
            if(master?.["Main Line"]!=null){
                const data:[VIN] | null=await getVIN(master?.["Main Line"]);
                console.log(data);
                data && setData(data[0]);
            }
        }
        )()

    },[master["Main Line"]])
    console.log("rendered")
    return(
        <div className="w-fit h-fit flex justify-center items-center p-5 bg-white rounded-4xl">
            <ul>
                {data?.Traceability && data.Traceability.map((ele,index)=>{
                    if(ele.Type_field=="Part"){
                        return <li key={index}>{ele.Part?.Part_Name} <span className="inline-block">{ele.QC.length>0?<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00a63e"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F19E39"><path d="M324-168h312v-120q0-65-45.5-110.5T480-444q-65 0-110.5 45.5T324-288v120ZM192-96v-72h60v-120q0-59 28-109.5t78-82.5q-49-32-77.5-82.5T252-672v-120h-60v-72h576v72h-60v120q0 59-28.5 109.5T602-480q50 32 78 82.5T708-288v120h60v72H192Z"/></svg>}</span></li>
                    }
                    else{
                        return <li key={index}>{ele.Sub_Assembly_BOM.Part_Name} <span className="inline-block">{ele.Sub_Assembly_Traceability?.ID?<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00a63e"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F19E39"><path d="M324-168h312v-120q0-65-45.5-110.5T480-444q-65 0-110.5 45.5T324-288v120ZM192-96v-72h60v-120q0-59 28-109.5t78-82.5q-49-32-77.5-82.5T252-672v-120h-60v-72h576v72h-60v120q0 59-28.5 109.5T602-480q50 32 78 82.5T708-288v120h60v72H192Z"/></svg>}</span></li>
                    }
            })}
            </ul>
        </div>
    )
}