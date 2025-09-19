
import { ChangeEvent, useContext, useState } from "react";
import { Toast } from "../UtitliyComponents/Toast";

//API
import { getBin } from "../../api/getRecords";

//Contexts
import { Items,SetCurrentItems} from "../../context/context";

//Types
// import { ContextItems } from "../../types";

export function Scanner(){
  const items=useContext(Items);
  // const setItems=useContext(SetItems);
  const setCurrentItems=useContext(SetCurrentItems);
  const[pointer,setPointer]=useState<number>(0);
  const[toast,setToast]=useState(false);

  async function handleChange(e:ChangeEvent<HTMLInputElement>){
    if(items?.Parts[pointer].Prefix!=null && e.target.value.startsWith(items.Parts[pointer].Prefix)){
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
      setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"QC":t}]);
      setPointer((pre)=>pre+1);
      e.target.value=""
    }
    else if(items?.Parts[pointer].Prefix==null){
      const data=await getBin(e.target.value);
      if(data && data?.[0].Parts[0].Part_Master.ID==items?.Parts[pointer].ID){
        setCurrentItems && setCurrentItems((pre)=>[...pre,{"Name":items.Parts[pointer].Name,"QC":data[0].Parts[0].QC_ID}]);
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

  return(
    <div className="border">
      <input type="text" placeholder="Scanner" className="text-center" key={items?.["Sub Assembly ID"]+""+items?.Station}
      onChange={handleChange}></input>
      {toast && <Toast message={"Wrong item scanned"} close={setToast}/>}
    </div>
  )
}

