
import { useContext } from "react"
import { Items } from "./sections/Items/Items";
import { Scanner } from "./sections/Scanner/Scanner";
import { Submit } from "./sections/Submit/Submit";

//Context
import { MasterContext, SetMasterContext } from "../../context/context";

//ContextComponent
import { MainMaster } from "./context/mainContext";


export function MainLine(){
   
    const master=useContext(MasterContext)
    const setMaster=useContext(SetMasterContext);

    return(
        <div className={`fixed h-screen w-screen ${master["Main Line"]!=null?"top-0":"top-[105vh]"} left-0 z-20 bg-gray-700/95 duration-700`}>
            <button className="absolute top-10 right-15 p-2 bg-white rounded-2xl cursor-pointer
            hover:scale-115 hover:bg-gray-400 duration-200" onClick={()=> setMaster && setMaster({type:"Diable_Main_Line"})}>Close</button>
            <div className="w-full h-full p-8 flex flex-col justify-evenly items-center gap-3">
                <MainMaster>
                    <div className="flex justify-center items-center h-9/10 gap-3">
                        <Items/>
                        <Scanner/>
                    </div>
                    <Submit/>
                </MainMaster>
            </div>
        </div>
    )    
   
}

// VIN0001