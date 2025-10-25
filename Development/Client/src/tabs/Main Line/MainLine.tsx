
import { useContext } from "react"

import { Scanner,List } from "./sections/Scanner/Scanner";

//Context
import { MasterContext, SetMasterContext } from "../../context/context"


export function MainLine(){
   
    const master=useContext(MasterContext)
    const setMaster=useContext(SetMasterContext);
    console.log("Re-rendered");
    if(master["Main Line"]){
        return(
            <div className={`fixed h-screen w-screen top-0 left-0 z-20 bg-gray-700/95 animate-slide-up duration-200`}>
                <button className="absolute top-10 right-15 p-2 bg-white rounded-2xl cursor-pointer
                hover:scale-115 hover:bg-gray-400 duration-200" onClick={()=> setMaster && setMaster({type:"Diable_Main_Line"})}>Close</button>
                {/*setMaster && setMaster({type:"Diable_Main_Line"}) && */}
                <div className="w-full h-full flex justify-evenly items-center">
                    <Scanner/>
                    <List/>
                </div>
            </div>
        )    
    }
    
    
}

// VIN0001