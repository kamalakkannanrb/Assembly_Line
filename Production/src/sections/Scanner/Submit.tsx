
import { useContext,useState } from "react";
import { Loading } from "../UtitliyComponents/Loading";
import { PopUp } from "../UtitliyComponents/PopUp";
import { Loader } from "../UtitliyComponents/Loader";

//API
import { addSATraceability } from "../../api/addRecords";
import { updateSATraceability } from "../../api/updateRecords";
//Types
// import { addSAPayload, updateSAPayload } from "../../types";
//Context
import { Items,SetItems,CurrentItems,SetCurrentItems } from "../../context/context"

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
    setPopUp(true);
    setLoading(false);
    
  }

    return(
        <div>
            {currentItems.Current.length==items?.Parts?.length && items.Parts?.length!=0?<button className="px-3 py-1 border rounded-2xl cursor-pointer hover:bg-blue-200 hover:duration-200" onClick={handleSubmit}>Submit</button>:<Loader/>}
            {popUp && <PopUp close={setPopUp}/>}
            {loading && <Loading/>}
        </div>
    )
}