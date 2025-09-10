
import { useState,createContext } from "react";
import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
import { AssembleItems } from "./AssembleItems/AssembleItems";
import { Scanner } from "./Scanner/Scanner"
import { Bin } from "./Bin/Bin";

//Types
import { ContextItems } from "../types";

export const Items=createContext<null | ContextItems>(null);
export const SetItems=createContext<any>(null);

export function BentoGrid(){
    const[stationData,setStationData]=useState<null | ContextItems>(null);
    return(
        <div className="w-screen h-screen flex items-center">
          <Items value={stationData}>
            <SetItems value={setStationData}>
              <div className="w-1/2 flex flex-col items-center">
                <h1 className="font-bold">{stationData?.["Sub Assembly Name"]}</h1>
                <h1>{stationData?.["Sub Assembly BOM Prefix"]}</h1>
                <Scanner/>
                <AssembleItems/>
              </div>
              <div className="w-1/2 flex flex-col justify-center items-center">
                <Bin/>
                <SubAssemblyBOM/>
              </div>
            </SetItems>
          </Items>
        </div>
    )
}