

import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
import { AssembleItems } from "./AssembleItems/AssembleItems";
import { Scanner } from "./Scanner/Scanner"
import { SubAssemblyInfo } from "./SubAssemblyInfo/SubAssemblyInfo";
// import { Bin } from "./Bin/Bin";
import { Submit } from "./Scanner/Submit";
import { Activity } from "./Activity/Activity";
import { NextItemBar } from "./NextItemBar/NextItemBar";
import { Progress } from "./Progress/Progress";
import { MainLine } from "../tabs/Main Line/MainLine";

//ContextComponent
import { Master, Scanned } from "../context/context";


//This component will not re-render frequently

export function BentoGrid(){

    return(
        <>
          <Master>
            <Scanned>
                  <MainLine/>
                  <SubAssemblyBOM/>
                  <div className="p-5 lg:px-16">
                    <div className="w-full h-48 flex justify-center gap-5">
                      <Progress/>
                      <Scanner/>
                      <div className="TopBoxes flex flex-col justify-start items-center gap-2">
                        <SubAssemblyInfo/>
                        <Submit/>
                      </div>
                    </div>
                    <NextItemBar/>
                    <div className="w-full mt-4 flex justify-center gap-5">
                      <AssembleItems/>
                      {/* <Bin/> */}
                      <Activity/>
                    </div>
                  </div>
            </Scanned>
          </Master>
        </>
    )
}

