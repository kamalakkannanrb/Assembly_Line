
import { useContext } from "react"

//Context
import { MasterContext } from "../../context/context"

export function SubAssemblyInfo(){
    const master=useContext(MasterContext);
    const date=new Date();
    const id=master?.["Sub Assembly BOM Prefix"]+date.getFullYear().toString().substring(2)+((date.getMonth()+1).toString());
    return(
        <div className="TopBoxes shrink">
            {master?.["Sub Assembly Name"] && <h1>{master?.["Sub Assembly Name"]}</h1>}
            {master?.["Sub Assembly BOM Prefix"] && <code id="Sticker" className="text-center text-sm lg:text-2xl break-all">{id}</code>}
        </div>
    )
}