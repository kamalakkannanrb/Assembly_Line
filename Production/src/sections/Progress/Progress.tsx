
import { useContext } from "react"

//Contexts
import { MasterContext, ScannedContext } from "../../context/context"

export function Progress(){
    const master=useContext(MasterContext);
    const scanned=useContext(ScannedContext);
    const progressPercent=master?.Parts && master.Parts.length>0?(scanned.Current.length/master?.Parts.length)*100:0;
    const progressNumberNominator=scanned.Current.length;
    const progressNumberDenominator=master?.Parts?master.Parts.length:0;
    return(
        <div className="TopBoxes">
            <h1>Progress</h1>
            <div className="h-9/12 flex flex-col justify-end items-center gap-2">
                <p className="font-mono text-2xl"><span>{progressNumberNominator}</span>/<span>{progressNumberDenominator}</span></p>
                <div className="w-9/10 h-2.5 rounded-2xl bg-gray-200">
                    <div className="h-2.5 rounded-2xl bg-black" style={{width:`${progressPercent}%`}}></div>
                </div>
                <p className="font-extralight text-sm">{progressPercent.toFixed()}% completed</p>
            </div>
        </div>
    )
}