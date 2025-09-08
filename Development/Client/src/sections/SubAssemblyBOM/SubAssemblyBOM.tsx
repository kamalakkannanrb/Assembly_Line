
import { useState } from "react";
import { SubAssemblies } from "./SubAssemblies";
import { Stations } from "./Stations";

export function SubAssemblyBOM(){
    const[SAID,setSAID]=useState(null);
    const[station,setStation]=useState<null | {"Station":String,"Individual":String[],"Bin":String[]}>(null);
    return(
        <>  
            <SubAssemblies setSAID={setSAID}/>
            <Stations setStation={setStation} SAID={SAID}/>
            {station &&<div className="flex flex-col"><strong>Individual: </strong>{station?.Individual.map((ele)=><ul>{ele}</ul>)}
            <strong>Bin: </strong>{station?.Bin.map((ele)=><ul>{ele}</ul>)}</div>}
        </>

    )
}