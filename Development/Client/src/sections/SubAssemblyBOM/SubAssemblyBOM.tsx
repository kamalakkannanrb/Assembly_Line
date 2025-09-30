
import { ChangeEvent, RefObject, useContext, useRef, useState} from "react";
import { SubAssemblies } from "./SubAssemblies";
import { Stations } from "./Stations";
import { InitiateScan } from "../UtitliyComponents/InitiateScan";
import { Time } from "../UtitliyComponents/Time";

//Contexts
import { Items } from "../../context/context";

export function SubAssemblyBOM(){
    const[scan,setScan]=useState(false);
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
        <div className="flex w-full h-[65px] justify-start items-center gap-2 pl-4 bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
            <h1 className="text-xl font-medium inline">Assembly Line</h1>
            <div className="flex justify-end items-center gap-6 grow-1 pr-4">
                <SubAssemblies SARef={SARef}/>
                {items?.["Sub Assembly ID"] && <Stations stationRef={stationRef} setScan={setScan}/>}
                {items?.Station && <label className="mx-1"><svg xmlns="http://www.w3.org/2000/svg" className="inline 
                hover:scale-115" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><input id="lock" type="checkbox" className="hidden" onChange={handleCheck}/></label>}
                {items?.Station && items["Main Station"]=="true" && <button className="p-2 rounded-2xl bg-gray-100 cursor-pointer 
                hover:bg-gray-400 hover:scale-105" onClick={handleClick}>Print label</button>}
                {scan && <InitiateScan setScan={setScan}/>}  
                <Time/>
            </div>
        </div>

    )
};