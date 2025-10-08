
import { useState } from "react";
import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
import { AssembleItems } from "./AssembleItems/AssembleItems";
import { Scanner } from "./Scanner/Scanner"
import { Bin } from "./Bin/Bin";
import { Submit } from "./Scanner/Submit";
import { Activity } from "./Activity/Activity";
import { NextItemBar } from "./NextItemBar/NextItemBar";
import { Progress } from "./Progress/Progress";

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
                  <div className="p-5 lg:px-16">
                    <div className="w-full h-48 flex justify-center gap-5">
                      <Progress/>
                      <Scanner/>
                      <div className="TopBoxes flex flex-col justify-start items-center gap-2">
                        {stationData?.["Sub Assembly Name"] && <h1 className="text-center font-bold text-2xl">{stationData?.["Sub Assembly Name"]}</h1>}
                        {stationData?.["Sub Assembly BOM Prefix"] && <h1 id="Sticker" className="text-center">{stationData?.["Sub Assembly BOM Prefix"]+date.toLocaleDateString()+date.toLocaleTimeString()}</h1>}
                        <Submit/>
                      </div>
                    </div>
                    <NextItemBar/>
                    <div className="w-full mt-4 flex justify-center gap-5">
                      <AssembleItems/>
                      <Bin/>
                      <Activity/>
                    </div>
                  </div>
                </ScannedItems>
            </SetItems>
          </Items>
        </>
    )
}

