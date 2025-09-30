
import { useState } from "react";
import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
import { AssembleItems } from "./AssembleItems/AssembleItems";
import { Scanner } from "./Scanner/Scanner"
import { Bin } from "./Bin/Bin";


//Types
import { ContextItems } from "../types";

//Contexts
import { Items,SetItems } from "../context/context";

//ContextComponent
import { ScannedItems } from "../context/context";


export function BentoGrid(){
    const[stationData,setStationData]=useState<ContextItems | null>(null);
    const date=new Date();
    return(
        <>
          <Items value={stationData}>
            <SetItems value={setStationData}>
              <ScannedItems>
                <SubAssemblyBOM/>
                <div className="relative w-full h-screen grid grid-cols-2 grid-rows-2 place-items-center bg-gray-50">
                  <div className="h-full w-full overflow-auto flex flex-col justify-center items-center gap-5">
                  {stationData?.["Sub Assembly Name"] && <h1 className="font-bold text-2xl mb-2">{stationData?.["Sub Assembly Name"]}</h1>}
                  {stationData?.["Sub Assembly BOM Prefix"] && <h1 id="Sticker">{stationData?.["Sub Assembly BOM Prefix"]+date.toLocaleDateString()+date.toLocaleTimeString()}</h1>}
                  <Scanner/>
                </div>
                <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                  <Bin/>
                </div>
                <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                  <AssembleItems/>
                </div>
                <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                </div>
                </div>
              </ScannedItems>
            </SetItems>
          </Items>
        </>
    )
}

