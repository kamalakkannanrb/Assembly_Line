
import { ChangeEvent, useContext, useState } from "react";
import { Toast } from "../UtitliyComponents/Toast";

//API
import { getQC } from "../../api/getRecords";

//Contexts
import { MasterContext, SetMasterContext, ScannedContext, SetScannedContext } from "../../context/context";

//UtitlityFunctions
import { addActivity } from "../../utilityFunctions/activityLog";


export function Scanner(){
  const master=useContext(MasterContext);
  const setMaster=useContext(SetMasterContext);
  const scanned=useContext(ScannedContext);
  const setScanned=useContext(SetScannedContext);
  const[toast,setToast]=useState(false);

  async function handleChange(e:ChangeEvent<HTMLInputElement>){

    if(e.target.value.trim().startsWith("BIN")){
      // const data=await getBin(e.target.value.trim());
      // if(data && master && setScanned && data?.[0].Parts[0].Part_Master.ID==master?.Parts[scanned.Pointer].ID){
      //   // setScanned && setScanned((pre)=>[...pre,{"Name":master.Parts[pointer].Name,"ID":master.Parts[pointer].ID,"QC":data[0].Parts[0].QC_ID}]);
      //   setScanned((pre)=>{
      //     return {...pre,"Already":[...pre.Already],"Current":[...(pre.Current),{"Name":master.Parts[scanned.Pointer].Name,"ID":master.Parts[scanned.Pointer].ID,"QC":data[0].Parts[0].QC_ID}],"Pointer":scanned.Pointer+1}
      //   })
      //   addActivity({code:"success",text:master.Parts[scanned.Pointer].Name});

      // }
      // else{
      //   addActivity({code:"fail",text:e.target.value});
      //   setToast(true);
      // }
    }

    else if(e.target.value.trim().startsWith("QC")){
      const data=await getQC(e.target.value.trim());
      // setScanned && setScanned((pre)=>[...pre,{"Name":master.Parts[pointer].Name,"ID":master.Parts[pointer].ID,"QC":t.trim()}]);
      
      if(data && master?.Parts && setScanned && data?.[0]?.Part_Name?.ID==master?.Parts[scanned.Pointer]?.ID){
        // setScanned((pre:ContextCurrentItems)=>{
        //   return {...pre,"Already":[...pre.Already],"Current":[...pre.Current,{"Name":master.Parts[scanned.Pointer].Name,"ID":master.Parts[scanned.Pointer].ID,"QC":[data?.[0].ID],"QC_ID":data?.[0].QC_ID}],"Pointer":scanned.Pointer+1}
        // })

        setScanned({
          type:"Add_QC_Increment_Pointer",
          data:{"Name":master.Parts[scanned.Pointer].Name,"ID":master.Parts[scanned.Pointer].ID,"QC":[data?.[0].ID],"QC_ID":[data?.[0].QC_ID]}
        })

        addActivity({code:"success",text:master.Parts[scanned.Pointer].Name});
      }
      else{
        addActivity({code:"fail",text:e.target.value});
        setToast(true);
      } 
    }

    else if(e.target.value.trim().startsWith("VIN")){

      // setMaster && setMaster((pre:ContextItems | null)=>{
      //     if(pre!=null){
      //         return {...pre,"Main Line":e.target.value.trim()}
      //     }
      //     else{
      //         return null;
      //     }
      // });

      setMaster && setMaster({type:"Enable_Main_Line",data:e.target.value.trim()})

      addActivity({code:"success",text:"Main Line"});

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
        {scanned.Current?.length!=master?.Parts?.length && master?.Station && <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-25 rounded-2xl"/>}
        {master?.Parts && master.Parts.length>0 && scanned.Current?.length!=master?.Parts?.length && master?.Station && <input type="text" id="Scanner" placeholder="Scanner" autoFocus autoComplete="off" className="text-center w-2/3 border border-gray-400 rounded-2xl p-1" key={master?.["Sub Assembly ID"]+""+master?.Station}
        onChange={handleChange}></input>}
        {master?.Parts && master.Parts.length>0 && scanned.Current?.length==master?.Parts?.length && master?.Station && <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="80px" height="80px" fill="#00a63e"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z"/></svg>Completed</span>}
        {toast && <Toast message={"Wrong item scanned"} close={setToast}/>}
      </div>
    </div>
  )
}


