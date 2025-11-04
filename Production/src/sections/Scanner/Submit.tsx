
import { useContext,useState } from "react";
import { Loading } from "../UtitliyComponents/Loading";
import { PopUp } from "../UtitliyComponents/PopUp";

//API
import { addSATraceability } from "../../api/addRecords";
import { updateSATraceability } from "../../api/updateRecords";

//Context
import { MasterContext, SetMasterContext, ScannedContext, SetScannedContext } from "../../context/context"

//UtilityFunctions
import { clearActivity } from "../../utilityFunctions/activityLog";

export function Submit(){
    const master=useContext(MasterContext);
    const setMaster=useContext(SetMasterContext);
    const scanned=useContext(ScannedContext);
    const setScanned=useContext(SetScannedContext);
    const[loading,setLoading]=useState(false);
    const[popUp,setPopUp]=useState(false);

    async function handleSubmit(){
    setLoading(true);
    const label=(document.getElementById("Sticker")?.innerText || "Default").trim();
    const parts:{"Part_Name":string,"QC_ID":string,"Quantity":string}[]=[];
    scanned.Already.forEach((ele)=>{
      parts.push(
        {
          //Should be Part ID
          "Part_Name":ele.ID,
          "QC_ID":ele.QC_ID,
          "Quantity":ele.Quantity
        }
      )
    })

  
    scanned.Current.forEach((ele)=>{
      ele.QC.forEach((qc)=>{
        parts.push({
          "Part_Name":ele.ID,
          "QC_ID":qc.QC_ID,
          "Quantity":qc.Quantity
        })
      })
    })
    
    console.log(parts);

    if(master?.["Main Station"]=="true"){
      await addSATraceability({
        "data":[
          {
            "Sub_Assembly_BOM":master["Sub Assembly ID"]?master["Sub Assembly ID"]:"",
            "SA_Traceability_ID": label,
            "Parts":parts
          }
        ]
      });
    }
    else{
      await updateSATraceability({
        "data":[
          {
            "Parts":parts
          }
        ]
      },scanned.ID);
    }
   
    // setScanned && setScanned({"Already":[],"Current":[],"Pointer":0,"ID":""});

    setScanned && setScanned({type:"Reset"});

    // setMaster && setMaster(null);

    setMaster && setMaster({type:"Reset"});

    clearActivity();
    setPopUp(true);
    setLoading(false);
    
  }

    return(
        <div>
            {scanned.Current.length==master?.Parts?.length && master.Parts?.length!=0 && <button className="p-3 border-0 bg-gray-100 rounded-2xl cursor-pointer hover:bg-green-300 hover:duration-200" onClick={handleSubmit}>Submit</button>}
            {popUp && <PopUp close={setPopUp}/>}
            {loading && <Loading/>}
        </div>
    )
}