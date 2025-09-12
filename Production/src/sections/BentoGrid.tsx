
import { useState } from "react";
import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
import { AssembleItems } from "./AssembleItems/AssembleItems";
import { Scanner } from "./Scanner/Scanner"
import { Bin } from "./Bin/Bin";

//Types
import { ContextItems } from "../types";

//Contexts
import { Items,SetItems } from "../context/context";


export function BentoGrid(){
    const[stationData,setStationData]=useState<null | ContextItems>(null);
    const date=new Date();
    return(
        <div className="w-screen h-screen grid grid-cols-2 grid-rows-2 place-items-center">
          <Items value={stationData}>
            <SetItems value={setStationData}>
              <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                {stationData?.["Sub Assembly Name"] && <h1 className="font-bold">{stationData?.["Sub Assembly Name"]}</h1>}
                {stationData?.["Sub Assembly BOM Prefix"] && <h1 id="Sticker">{stationData?.["Sub Assembly BOM Prefix"]+stationData?.Station+date.toLocaleDateString()+date.toLocaleTimeString()}</h1>}
                <Scanner/>
              </div>
              <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                <Bin/>
              </div>
              <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                <AssembleItems/>
                {/* <AssembleItems/> */}
              </div>
              <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
                <SubAssemblyBOM/>
              </div>
            </SetItems>
          </Items>
        </div>
    )
}

