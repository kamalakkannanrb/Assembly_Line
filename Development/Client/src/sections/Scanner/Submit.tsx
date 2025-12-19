
import { useContext,useState } from "react";
import { Loading } from "../UtitliyComponents/Loading";
import { PopUp } from "../UtitliyComponents/PopUp";

//API
import { addSATraceability } from "../../api/addRecords";
import { updateSATraceability } from "../../api/updateRecords";

//Context
import { MasterContext, SetMasterContext, ScannedContext, SetScannedContext } from "../../context/context"

//UtilityFunctions
import { clearActivity, addActivity } from "../../utilityFunctions/activityLog";

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
    const parts:{"Part_ID":string,"QC_ID":string,"QC_Name":string,"Quantity":string}[]=[];
    // scanned.Already.forEach((ele)=>{
    //   parts.push(
    //     {
    //       //Should be Part ID
    //       "Part_Name":ele.ID,
    //       "QC_ID":ele.QC_ID,
    //       "Quantity":ele.Quantity
    //     }
    //   )
    // })

  
    Object.values(scanned.Current).forEach((ele)=>{
      let quants=scanned.Current[ele.ID]["Required Quantity"];
      const QCs=ele.QC;
      for(const qc of QCs){
        
        if(Number.parseFloat(qc.Quantity)>=quants){
          parts.push({
            "Part_ID":ele.ID,
            "QC_ID":qc.QC_ID,
            "QC_Name":qc.QC_Name,
            "Quantity":quants.toString()
          })
          break;
        }
        else{
          parts.push({
            "Part_ID":ele.ID,
            "QC_ID":qc.QC_ID,
            "QC_Name":qc.QC_Name,
            "Quantity":qc.Quantity
          })
          quants-=Number.parseFloat(qc.Quantity);
        }
      }
      
    })
    
    console.log(parts);

    if(master?.["Main Station"]=="true"){
      
      const data=await addSATraceability({

        "Type":"New",
        "Parts":parts,
        "SA_Traceability_ID":label || "",
        "Sub_Assembly_BOM":master["Sub Assembly ID"] || ""

      })
      if(data.success=="true"){
        setScanned && setScanned({type:"After_Submit_Workflows",data:data.data})
      }
      else{
        console.log(data);
      }
    }
    else{
      const data=await updateSATraceability({
        
        "Parts":parts,
        "SA_Traceability_Report_ID":scanned.SA_Traceability_Report_ID

      });
      if(data.success=="true"){
        setMaster && setMaster({type:"Make_Main_Station_false"})
        setScanned && setScanned({type:"After_Submit_Workflows",data:data.data})
      }
      else{
        console.log(data);
      }

    }

    // setScanned && setScanned({type:"After_Submit_Workflows",data:data})
    addActivity({code:"success",text:"Submitted successfully"})
    // setMaster && setMaster({type:"Reset"});

    // clearActivity();
    setPopUp(true);
    setLoading(false);
    
  }

    return(
        <div>
            {scanned.Submit && <button className="p-3 border-0 bg-gray-100 rounded-2xl cursor-pointer hover:bg-green-300 hover:duration-200" onClick={handleSubmit}>Submit</button>}
            {popUp && <PopUp close={setPopUp}/>}
            {loading && <Loading/>}
        </div>
    )
}