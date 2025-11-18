
import { useContext, useState } from "react"
import { PopUp } from "../../../../sections/UtitliyComponents/PopUp";
import { Loading } from "../../../../sections/UtitliyComponents/Loading";

//API
import { updateVIN } from "../../api/updateRecords";

//Types
import { Traceability } from "../../types/main";

//Context
import { SetMasterContext } from "../../../../context/context";
import { MainMasterContext } from "../../context/mainContext"

// export interface Traceability{
//     "Type_field": "Sub Assembly" | "Part",
//     "Status": "Pending" | "Completed",
//     "QC": string,
//     "Required_Quantity": string,
//     "Sub_Assembly_BOM":string,
//     "Quantity": string,
//     "Part_Name": string,
//     "Sub_Assembly_Traceability": string
// }

export function Submit(){
    const mainMaster=useContext(MainMasterContext);
    const setMaster=useContext(SetMasterContext);
    const[loading,setLoading]=useState(false);
    const[popUp,setPopUp]=useState(false);
    async function handleSubmit(){
        
        setLoading(true);
        if(mainMaster!="Loading"){
            const trace:Traceability[]=[];
            Object.keys(mainMaster.Parts).forEach((ele)=>{
                const part=mainMaster.Parts[ele];
                if(part.Type_field=="Part"){
                    if(Object.values(part.QC).length>0){
                        Object.keys(part.QC).forEach((qc)=>{
                            trace.push({
                                "Part_Name":ele,
                                "Sub_Assembly_BOM":"",
                                "Type_field":part.Type_field,
                                "QC":qc,
                                "Required_Quantity":part.Required_Quantity,
                                "Quantity":part.QC[qc]?.Quantity?part.QC[qc]?.Quantity:"",
                                "Status":part.Status,
                                "Sub_Assembly_Traceability":""
                            })
                        })
                    }
                    else{
                        trace.push({
                            "Part_Name":ele,
                            "Sub_Assembly_BOM":"",
                            "Type_field":part.Type_field,
                            "QC":"",
                            "Required_Quantity":part.Required_Quantity,
                            "Quantity":part.Quantity,
                            "Status":part.Status,
                            "Sub_Assembly_Traceability":""
                        })
                    }
                }
                else{
                    trace.push({
                        "Part_Name":"",
                        "Sub_Assembly_BOM":ele,
                        "Type_field":part.Type_field,
                        "QC":"",
                        "Required_Quantity":part.Required_Quantity,
                        "Quantity":part.Quantity,
                        "Status":part.Status,
                        "Sub_Assembly_Traceability":part.Sub_Assembly_Traceability
                    })
                }
            })
            const data={
                "data":{
                    "Traceability":trace
                }
            }
            console.log(data)
            await updateVIN(mainMaster["VIN ID"],data);
        }

        setPopUp(true);
        setLoading(false);
        setMaster && setMaster({type:"Diable_Main_Line"})
    }
    return(
        <div>
            <button className="p-3 border-0 bg-gray-100 rounded-2xl cursor-pointer hover:bg-green-300 hover:duration-200" onClick={handleSubmit}>Submit</button>
            {popUp && <PopUp close={setPopUp}/>}
            {loading && <Loading/>}
        </div>
    )
}