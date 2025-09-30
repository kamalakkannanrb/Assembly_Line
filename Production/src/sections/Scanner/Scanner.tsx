
import { ChangeEvent, useContext, useState } from "react";
import { Toast } from "../UtitliyComponents/Toast";
import { Submit } from "./Submit";

//API
import { getBin } from "../../api/getRecords";

//Contexts
import { Items, CurrentItems, SetCurrentItems } from "../../context/context";


export function Scanner(){
  const items=useContext(Items);
  const currentItems=useContext(CurrentItems);
  const setCurrentItems=useContext(SetCurrentItems);
  // const[pointer,setPointer]=useState<number>(0);
  const[toast,setToast]=useState(false);

  async function handleChange(e:ChangeEvent<HTMLInputElement>){
    //@ts-ignore
    if(items?.Parts[currentItems.Pointer].Prefix!=null && e.target.value.trim().startsWith(items?.Parts[currentItems.Pointer].Prefix)){
      const t=e.target.value;
      // setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"ID":items.Parts[pointer].ID,"QC":t.trim()}]);
      setCurrentItems && setCurrentItems((pre)=>{
        return {...pre,"Already":[...pre.Already],"Current":[...pre.Current,{"Name":items.Parts[currentItems.Pointer].Name,"ID":items.Parts[currentItems.Pointer].ID,"QC":t.trim()}],"Pointer":currentItems.Pointer+1}
      })
      // setPointer((pre)=>pre+1);
      e.target.value=""
    }
    else if(items?.Parts[currentItems.Pointer].Prefix==null){
      const data=await getBin(e.target.value.trim());
      if(data && data?.[0].Parts[0].Part_Master.ID==items?.Parts[currentItems.Pointer].ID){
        // setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"ID":items.Parts[pointer].ID,"QC":data[0].Parts[0].QC_ID}]);
        setCurrentItems && setCurrentItems((pre)=>{
          return {...pre,"Already":[...pre.Already],"Current":[...(pre.Current),{"Name":items.Parts[currentItems.Pointer].Name,"ID":items.Parts[currentItems.Pointer].ID,"QC":data[0].Parts[0].QC_ID}],"Pointer":currentItems.Pointer+1}
        })
        // setPointer((pre)=>pre+1);
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

  return(
    <div className="flex flex-col justify-center items-center gap-3">
      {currentItems.Current?.length!=items?.Parts?.length && items?.Station && <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-25 rounded-2xl"/>}
      {currentItems.Current?.length!=items?.Parts?.length && items?.Station && <input type="text" id="Scanner" placeholder="Scanner" autoFocus className="text-center border rounded-2xl p-1" key={items?.["Sub Assembly ID"]+""+items?.Station}
      onChange={handleChange}></input>}
      {toast && <Toast message={"Wrong item scanned"} close={setToast}/>}
      <Submit/>
    </div>
  )
}

