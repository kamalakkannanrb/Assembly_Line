
import { SubAssemblyBOM } from "./SubAssemblyBOM/SubAssemblyBOM"
// @ts-ignore
import { Scanner } from "./Scanner/Scanner"

export function BentoGrid(){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
          <SubAssemblyBOM/>
          {/* <Scanner/> */}
        </div>
    )
}