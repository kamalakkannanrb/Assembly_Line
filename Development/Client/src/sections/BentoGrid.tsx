
import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
import { AssembleItems } from "./AssembleItems/AssembleItems";
import { Scanner } from "./Scanner/Scanner"
import { SubAssemblyInfo } from "./SubAssemblyInfo/SubAssemblyInfo";
import { RedTag } from "./RedTag/RedTag";
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
                  <RedTag/>
                  <SubAssemblyBOM/>
                  <div className="p-5 h-[calc(100vh-65px)]">
                    <div className="w-full h-full flex">
                      <div className="w-[20%] flex flex-col gap-5 justify-center items-center">
                        {/* <NextItemBar/> */}
                        <Progress/>
                        <Scanner/>
                        <SubAssemblyInfo/>
                        <Submit/>
                      </div>
                      <div className="w-[80%] flex gap-5">
                        <AssembleItems/>
                        <Activity/>
                        {/* <Bin/> */}
                      </div>
                    </div>
                  </div>
                    
            </Scanned>
          </Master>
        </>
    )
}

