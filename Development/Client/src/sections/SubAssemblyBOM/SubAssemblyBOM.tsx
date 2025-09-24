
import { ChangeEvent, RefObject, useContext, useRef, memo} from "react";
import { SubAssemblies } from "./SubAssemblies";
import { Stations } from "./Stations";
//Contexts
import { Items } from "../../context/context";

export const SubAssemblyBOM=memo(()=>{
    const items=useContext(Items);
    const SARef:RefObject<HTMLSelectElement | null>=useRef(null);
    const stationRef:RefObject<HTMLSelectElement | null>=useRef(null);
    function handleCheck(e:ChangeEvent<HTMLInputElement>){
        if(e.target.checked){
            if(SARef.current){
                SARef.current.setAttribute("disabled","true");
                SARef.current.style.backgroundColor="grey";
            }
            if(stationRef.current){
                stationRef.current.setAttribute("disabled","true");
                stationRef.current.style.backgroundColor="grey";
            }
        }
        else{
            if(SARef.current){
                SARef.current.removeAttribute("disabled");
                SARef.current.style.backgroundColor="";
            }
            if(stationRef.current){
                stationRef.current.removeAttribute("disabled");
                stationRef.current.style.backgroundColor="";
            }
        }
    }

    function handleClick(){
        if(SARef.current){
            SARef.current.setAttribute("disabled","true");
            SARef.current.style.backgroundColor="grey";
        }
        if(stationRef.current){
            stationRef.current.setAttribute("disabled","true");
            stationRef.current.style.backgroundColor="grey";
        }
        const l:HTMLInputElement | null=document.querySelector("#lock");
        if(l)l.checked=true;
        window.print();
    }
    
    return(
        <>  
            <h1 className="font-bold mb-2 text-2xl">Sub Assembly BOM</h1>
            <SubAssemblies SARef={SARef}/>
            {items?.["Sub Assembly ID"] && <Stations stationRef={stationRef}/>}
            {items?.Station && <label>Lock <input id="lock" type="checkbox" onChange={handleCheck}/></label>}
            {items?.Station && <button className="p-2 border rounded-2xl bg-green-400 cursor-pointer" onClick={handleClick}>Print label</button>}
        </>

    )
});