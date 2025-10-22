
import { useContext } from "react"

//Context
import { MasterContext, ScannedContext } from "../../context/context"

export function NextItemBar(){
    const master=useContext(MasterContext);
    const scanned=useContext(ScannedContext);
    var name:string | undefined="";
    if(master?.Parts && scanned.Current.length==0)name=master?.Parts[0]?.Name;
    else if(master?.Parts && scanned.Pointer<master.Parts.length)name=master.Parts[scanned.Pointer].Name;
    else name="";
    return(
        <div className="-z-1 relative w-full h-15 mt-4 bg-blue-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="relative top-6 left-5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d5fe3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
            <p className="inline relative top-0.5 left-11 text-sm">Next item : {name}</p>
        </div>
    )
}