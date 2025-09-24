
import { ChangeEvent, useContext, useState } from "react";
import { Toast } from "../UtitliyComponents/Toast";
import { PopUp } from "../UtitliyComponents/PopUp";
import { Loading } from "../UtitliyComponents/Loading";

//API
import { getBin } from "../../api/getRecords";
import { addSATraceability } from "../../api/addRecords";

//Contexts
import { Items, CurrentItems, SetCurrentItems, SetItems} from "../../context/context";

//Types
// import { ContextItems } from "../../types";
import { payload } from "../../types";


export function Scanner(){
  const items=useContext(Items);
  const setItems=useContext(SetItems);
  const currentItems=useContext(CurrentItems);
  const setCurrentItems=useContext(SetCurrentItems);
  const[pointer,setPointer]=useState<number>(0);
  const[toast,setToast]=useState(false);
  const[popUp,setPopUp]=useState(false);
  const[loading,setLoading]=useState(false);

  async function handleChange(e:ChangeEvent<HTMLInputElement>){
    if(items?.Parts[pointer].Prefix!=null && e.target.value.trim().startsWith(items.Parts[pointer].Prefix)){
      // const part=[...items.Parts];
      // part[pointer].QC=e.target.value;
      // console.log(part);
      // setItems && setItems((pre:ContextItems | null)=>{
      //   if(pre!=null){
      //     return {...pre,"Parts":part};
      //   }
      //   else{
      //     return null;
      //   }
      // });
      // console.log("Triggered");
      const t=e.target.value;
      setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"ID":items.Parts[pointer].ID,"QC":t.trim()}]);
      setPointer((pre)=>pre+1);
      e.target.value=""
    }
    else if(items?.Parts[pointer].Prefix==null){
      const data=await getBin(e.target.value.trim());
      if(data && data?.[0].Parts[0].Part_Master.ID==items?.Parts[pointer].ID){
        setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"ID":items.Parts[pointer].ID,"QC":data[0].Parts[0].QC_ID}]);
        setPointer((pre)=>pre+1);
      }
      else{
        setToast(true);
      }
      e.target.value=""
    }
    else{
      setToast(true);
      e.target.value="";
    }
    
  }

  async function handleSubmit(){
    setLoading(true);
    const label=document.getElementById("Sticker")?.innerText || "Default";
    const parts=currentItems.map((ele)=>{
      return {
        //Should be Part ID
        "Part_Name":ele.ID,
        "QC_ID":ele.QC
      }
    })
    const payload:payload= {
    "data": [
        {
          "SA_Number": label,
          "Parts":parts
        }
      ]
    }
    console.log(payload);
    await addSATraceability(payload);
    setCurrentItems && setCurrentItems([]);
    setItems && setItems(null);
    setPointer(0);
    setPopUp(true);
    setLoading(false);
    
  }

  return(
    <div className="flex flex-col">
      {currentItems.length!=items?.Parts?.length && items?.Station && <input type="text" placeholder="Scanner" className="text-center border rounded-2xl p-1 mt-5" key={items?.["Sub Assembly ID"]+""+items?.Station}
      onChange={handleChange}></input>}
      {currentItems.length==items?.Parts?.length && items.Parts?.length!=0 && <button className="mt-8 px-3 py-1 border rounded-2xl cursor-pointer hover:bg-blue-200 hover:duration-200" onClick={handleSubmit}>Submit</button>}
      {/* <button className="mt-8 px-3 py-1 border rounded-2xl cursor-pointer hover:bg-blue-200 hover:duration-200" onClick={handleSubmit}>Submit</button> */}
      {toast && <Toast message={"Wrong item scanned"} close={setToast}/>}
      {popUp && <PopUp close={setPopUp}/>}
      {loading && <Loading/>}
    </div>
  )
}

