
import { useContext, useEffect } from "react"

//Contexts
import { MasterContext } from "../../context/context"

//UtitlityFunctions
import { clearActivity } from "../../utilityFunctions/activityLog";

export function Activity(){
    const master=useContext(MasterContext);
    useEffect(()=>{
        clearActivity();
    },[master?.["Sub Assembly ID"],master?.Station])
    return(
        <div className="BottomBoxes">
            <h1>Activity Log</h1>
            <div className="h-[80%] p-3 overflow-auto">
                <div id="ActivityLog">
                    {/* <div className="flex items-center p-1 my-3 border border-amber-200 rounded-lg bg-amber-100">
                        <span className="w-2.5 h-2.5 mx-2 shrink-0 bg-amber-500 rounded-full"></span>
                        <p className="grow" style={{wordBreak:"break-word"}}><span className="font-mono font-bold">NVA5P1.ELP0030/A </span>wrong part scanned</p>
                        <span className="mx-2 shrink-0 font-extralight text-xs">10:00 pm</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}