
import { ChangeEvent, useContext, useState } from "react";
import { Toast } from "../UtitliyComponents/Toast";

//API
import { getBin,getQC } from "../../api/getRecords";

//Contexts
import { Items, CurrentItems, SetCurrentItems } from "../../context/context";

//UtitlityFunctions
import { addActivity } from "../../utilityFunctions/activityLog";


export function Scanner(){
  const items=useContext(Items);
  const currentItems=useContext(CurrentItems);
  const setCurrentItems=useContext(SetCurrentItems);
  const[toast,setToast]=useState(false);

  async function handleChange(e:ChangeEvent<HTMLInputElement>){
    //@ts-ignore
    if(e.target.value.trim().startsWith("BIN")){
      const data=await getBin(e.target.value.trim());
      if(data && items && setCurrentItems && data?.[0].Parts[0].Part_Master.ID==items?.Parts[currentItems.Pointer].ID){
        // setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"ID":items.Parts[pointer].ID,"QC":data[0].Parts[0].QC_ID}]);
        setCurrentItems((pre)=>{
          return {...pre,"Already":[...pre.Already],"Current":[...(pre.Current),{"Name":items.Parts[currentItems.Pointer].Name,"ID":items.Parts[currentItems.Pointer].ID,"QC":data[0].Parts[0].QC_ID}],"Pointer":currentItems.Pointer+1}
        })
        addActivity({code:"success",text:items.Parts[currentItems.Pointer].Name});

      }
      else{
        addActivity({code:"fail",text:e.target.value});
        setToast(true);
      }
    }
    else if(e.target.value.trim().startsWith("QC")){
      const data=await getQC(e.target.value.trim());
      // setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"ID":items.Parts[pointer].ID,"QC":t.trim()}]);
      
      if(data && items && setCurrentItems &&data?.[0].Part_Name.ID==items?.Parts[currentItems.Pointer].ID){
        setCurrentItems((pre)=>{
          return {...pre,"Already":[...pre.Already],"Current":[...pre.Current,{"Name":items.Parts[currentItems.Pointer].Name,"ID":items.Parts[currentItems.Pointer].ID,"QC":data?.[0].QC_ID}],"Pointer":currentItems.Pointer+1}
        })
        //@ts-ignore
        addActivity({code:"success",text:items.Parts[currentItems.Pointer].Name});
      }
      else{
        addActivity({code:"fail",text:e.target.value});
        setToast(true);

      }
      

    }
    else{
      addActivity({code:"fail",text:e.target.value});
      setToast(true);
    }
    e.target.value=""
    
  }

  return(
    <div className="TopBoxes">
      <h1 className="font-bold text-center text-2xl">Scanner</h1>
      <div className="flex flex-col justify-center items-center">
        {currentItems.Current?.length!=items?.Parts?.length && items?.Station && <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-25 rounded-2xl"/>}
        {currentItems.Current?.length!=items?.Parts?.length && items?.Station && <input type="text" id="Scanner" placeholder="Scanner" autoFocus autoComplete="off" className="text-center w-2/3 border border-gray-400 rounded-2xl p-1" key={items?.["Sub Assembly ID"]+""+items?.Station}
        onChange={handleChange}></input>}
        {currentItems.Current?.length==items?.Parts?.length && items?.Station && <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="80px" height="80px" fill="#00a63e"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z"/></svg>Completed</span>}
        {toast && <Toast message={"Wrong item scanned"} close={setToast}/>}
      </div>
    </div>
  )
}


