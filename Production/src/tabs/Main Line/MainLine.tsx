
import { useContext } from "react"

import { Scanner,List } from "./sections/Scanner/Scanner";

//Context
import { MasterContext, SetMasterContext } from "../../context/context"


export function MainLine(){
    const setMaster=useContext(SetMasterContext);
    const master=useContext(MasterContext)
    if(master["Main Line"]){
        return(
            <div className="fixed h-screen w-screen top-0 left-0 z-20 bg-gray-500 animate-slide">
                <button className="absolute top-10 right-15 p-2 bg-white rounded-2xl" onClick={()=>setMaster && setMaster({type:"Diable_Main_Line"})}>Close</button>
                <div className="w-full h-full flex justify-center items-center">
                    <Scanner/>
                    <List/>
                </div>
            </div>
        )    
    }
    
}

// VIN0001