
import { useContext,useState } from "react";
import { Loading } from "../UtitliyComponents/Loading";
import { PopUp } from "../UtitliyComponents/PopUp";

//API
import { addSATraceability } from "../../api/addRecords";
import { updateSATraceability } from "../../api/updateRecords";

//Context
import { Items,SetItems,CurrentItems,SetCurrentItems } from "../../context/context"

//UtilityFunctions
import { clearActivity } from "../../utilityFunctions/activityLog";

export function Submit(){
    const items=useContext(Items);
    const setItems=useContext(SetItems);
    const currentItems=useContext(CurrentItems);
    const setCurrentItems=useContext(SetCurrentItems);
    const[loading,setLoading]=useState(false);
    const[popUp,setPopUp]=useState(false);

    async function handleSubmit(){
    setLoading(true);
    const label=(document.getElementById("Sticker")?.innerText || "Default").trim();
    const parts:{"Part_Name":string,"QC_ID":string}[]=[];
    currentItems.Already.forEach((ele)=>{
      parts.push(
        {
          //Should be Part ID
          "Part_Name":ele.ID,
          "QC_ID":ele.QC
        }
      )
    })
    currentItems.Current.forEach((ele)=>{
      parts.push(
        {
          //Should be Part ID
          "Part_Name":ele.ID,
          "QC_ID":ele.QC
        }
      )
    })
    
    // console.log(payload);
    if(items?.["Main Station"]=="true"){
      await addSATraceability({
        "data":[
          {
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
      },currentItems.ID);
    }
   
    setCurrentItems && setCurrentItems({"Already":[],"Current":[],"Pointer":0,"ID":""});
    setItems && setItems(null);
    clearActivity();
    setPopUp(true);
    setLoading(false);
    
  }

    return(
        <div>
            {currentItems.Current.length==items?.Parts?.length && items.Parts?.length!=0 && <button className="p-3 border-0 bg-gray-100 rounded-2xl cursor-pointer hover:bg-green-300 hover:duration-200" onClick={handleSubmit}>Submit</button>}
            {popUp && <PopUp close={setPopUp}/>}
            {loading && <Loading/>}
        </div>
    )
}