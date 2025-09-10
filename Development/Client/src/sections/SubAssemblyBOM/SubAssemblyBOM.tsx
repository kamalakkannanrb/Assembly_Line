
import { ChangeEvent, RefObject, useContext, useRef} from "react";
import { SubAssemblies } from "./SubAssemblies";
import { Stations } from "./Stations";
import { Items } from "../BentoGrid";

export function SubAssemblyBOM(){
    const items=useContext(Items);
    const SARef:RefObject<HTMLSelectElement | null>=useRef(null);
    const stationRef:RefObject<HTMLSelectElement | null>=useRef(null);
    function handleCheck(e:ChangeEvent<HTMLInputElement>){
        if(e.target.checked){
            SARef.current?.setAttribute("disabled","true");
            stationRef.current?.setAttribute("disabled","true");
        }
        else{
            SARef.current?.removeAttribute("disabled");
            stationRef.current?.removeAttribute("disabled");
        }
    }
    
    return(
        <>  
            <h1 className="font-bold">Sub Assembly</h1>
            <SubAssemblies SARef={SARef}/>
            {items?.["Sub Assembly ID"] && <Stations stationRef={stationRef}/>}
            {items?.["Sub Assembly ID"] && <label>Lock <input type="checkbox" onChange={handleCheck}/></label>}
        </>

    )
}