
import { ChangeEvent, RefObject, useContext, useEffect, useRef, useState } from "react";
import { SubAssemblies } from "./SubAssemblies";
import { Stations } from "./Stations";
import { InitiateScan } from "../UtitliyComponents/InitiateScan";
import { Time } from "../UtitliyComponents/Time";

//Contexts
import { MasterContext } from "../../context/context";

export function SubAssemblyBOM(){
    useEffect(() => {
        const update = () => setIsOnline(window.navigator.onLine);
        window.addEventListener("online", update);
        window.addEventListener("offline", update);

        return () => {
            window.removeEventListener("online", update);
            window.removeEventListener("offline", update);
        };
    }, []);
  
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const master=useContext(MasterContext);
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
        const l:HTMLInputElement | null=document.querySelector("#Lock");
        if(l)l.checked=true;
        window.print();
    }
    
    return(
        <div className="flex w-full h-[65px] justify-start items-center gap-2 pl-3 bg-white">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg> */}
            <img src="https://raptee-media-development.zohostratus.in/Website/raptee-skull-black.png" className="w-15 h-auto"></img>
            <h1 className="text-lg lg:text-2xl font-medium inline wrap-break-word">Assembly Line </h1>
            {/* <span id="Network" className={`inline-block w-3 h-3 ml-2 ${isOnline?'bg-green-600':'bg-red-600'} rounded-full animate-pulse`}></span> */}
            <div className="flex justify-end items-center gap-6 grow-1 pr-5">
                <SubAssemblies SARef={SARef}/>
                {master?.["Sub Assembly ID"] && <Stations stationRef={stationRef}/>}
                {master?.Station && <label className="mx-1"><svg xmlns="http://www.w3.org/2000/svg" className="inline 
                hover:scale-115" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><input id="Lock" type="checkbox" className="hidden" onChange={handleCheck}/></label>}
                {master?.Station && master["Main Station"]=="true" && <button className="p-2 rounded-2xl bg-gray-100 cursor-pointer 
                hover:bg-gray-400 hover:scale-105" onClick={handleClick}>Print label</button>}
                {master?.["Main Station"]=="false" && <InitiateScan/>}  
                <Time/>
                {isOnline?<svg xmlns="http://www.w3.org/2000/svg" className="animate-pulse" height="40px" viewBox="0 -960 960 960" width="40px" fill="#00a63e"><path d="M216-144q-29.7 0-50.85-21.18Q144-186.35 144-216.09v-144.17Q144-390 165.15-411q21.15-21 50.85-21h384v-144h72v144h72q30.53 0 52.26 21Q818-390 816-360v144q-2 29-22.56 50.5T744-144H216Zm0-72h528v-144H216v144Zm83.79-36q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm132 0q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm132 0q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM581-631l-51-51q21-20 49-29t57-9q29 0 57 9t49 29l-51 51q-11-11-25.5-14t-29.5-3q-15 0-29.5 3T581-631ZM480-732l-52-52q41-42 95.5-61T636-864q58 0 112.5 19t95.5 61l-52 52q-31-31-71.5-45.5T636-792q-44 0-84.5 14.5T480-732ZM216-216v-144 144Z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" className="animate-pulse" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e7000b"><path d="m581-631-51-51q21-20 49-29t57-9q29 0 57 9t49 29l-51 51q-11-11-25.5-14t-29.5-3q-15 0-29.5 3T581-631ZM480-732l-52-52q41-42 95.5-61T636-864q58 0 112.5 19t95.5 61l-52 52q-31-31-71.5-45.5T636-792q-44 0-84.5 14.5T480-732Zm336 486L600-462.39V-576h72v144h72q30.53 0 52.26 21Q818-390 816-360v114Zm-600 30h426L498-360H216v144ZM768-90l-54-54H216q-29.7 0-50.85-21.18Q144-186.35 144-216.09v-144.17Q144-390 165.15-411q21.15-21 50.85-21h210L90-768l51-51 678 678-51 51ZM300.21-252q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm132 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5Zm132 0q-15.21 0-25.71-10.29t-10.5-25.5q0-15.21 10.29-25.71t25.5-10.5q15.21 0 25.71 10.29t10.5 25.5q0 15.21-10.29 25.71t-25.5 10.5ZM216-216v-144 144Z"/></svg>}
            </div>
        </div>

    )
};