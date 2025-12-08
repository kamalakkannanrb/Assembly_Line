
import { useContext } from "react"

//Context
import { MasterContext } from "../../context/context"

export function SubAssemblyInfo(){
    const master=useContext(MasterContext);
    const date=new Date();

    return(
        <div className="TopBoxes shrink">
            {master?.["Sub Assembly Name"] && <h1>{master?.["Sub Assembly Name"]}</h1>}
            {master?.["Sub Assembly BOM Prefix"] && <h1 id="Sticker" className="text-center text-sm lg:text-2xl break-all">{master?.["Sub Assembly BOM Prefix"]+date.toLocaleDateString()+date.toLocaleTimeString()}</h1>}
        </div>
    )
}