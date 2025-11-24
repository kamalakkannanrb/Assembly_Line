
import { useContext } from "react"

//Context
import { MasterContext } from "../../context/context"

export function SubAssemblyInfo(){
    const master=useContext(MasterContext);
    const date=new Date();

    return(
        <div className="TopBoxes shrink">
            {master?.["Sub Assembly Name"] && <h1 className="text-center font-bold text-2xl">{master?.["Sub Assembly Name"]}</h1>}
            {master?.["Sub Assembly BOM Prefix"] && <h1 id="Sticker" className="text-center break-all">{master?.["Sub Assembly BOM Prefix"]+date.toLocaleDateString()+date.toLocaleTimeString()}</h1>}
        </div>
    )
}