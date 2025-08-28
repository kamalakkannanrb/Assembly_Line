
// import { SubAssemblyBOM } from "./sections/SubAssemblyBOM"
import { Scanner } from "./sections/Scanner"

export function Bento(){
    return(
        <div className="w-screen h-screen flex justify-center items-center">
          {/* <SubAssemblyBOM/> */}
          <Scanner/>
        </div>
    )
}