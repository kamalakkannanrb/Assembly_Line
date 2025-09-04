
import { useState } from "react";
import { SubAssemblies } from "./SubAssemblies";
import { Stations } from "./Stations";

export function SubAssemblyBOM(){
    const[SAID,setSAID]=useState(null);
    //@ts-ignore
    const[station,setStation]=useState(null);
    return(
        <>  
            <SubAssemblies setSAID={setSAID}/>
            <Stations setStation={setStation} SAID={SAID}/>
        </>

    )
}