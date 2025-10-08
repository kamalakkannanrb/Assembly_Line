
import { useContext } from "react"

//Context
import { CurrentItems,Items } from "../../context/context"

export function NextItemBar(){
    const currentItems=useContext(CurrentItems);
    const items=useContext(Items);
    var name:string | undefined="";
    if(items?.Parts && currentItems.Current.length==0)name=items?.Parts[0]?.Name;
    else if(items?.Parts && currentItems.Pointer<items.Parts.length)name=items.Parts[currentItems.Pointer].Name;
    else name="";
    return(
        <div className="relative w-full h-15 mt-4 bg-blue-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="relative top-6 left-5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d5fe3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
            <p className="inline relative top-0.5 left-11 text-sm">Next item : {name}</p>
        </div>
    )
}