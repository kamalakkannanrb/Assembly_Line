
import { ChangeEvent, useContext, useState } from "react";

//Contexts
import { Items,SetCurrentItems } from "../../context/context";


export function Scanner(){
  const items=useContext(Items);
  const setCurrentItems=useContext(SetCurrentItems);
  const[pointer,setPointer]=useState<number>(0);

  function handleChange(e:ChangeEvent<HTMLInputElement>){
    if(items?.Parts[pointer].Prefix!=null && items.Parts[pointer].Prefix==e.target.value && setCurrentItems){
      setCurrentItems((pre:{ "Name": string, "QC": string }[])=>[...pre,{"Name":items?.Parts[pointer].Name,"QC":e.target.value}])
      setPointer((pre)=>pre+1);
    }
    
  }

  return(
    <div className="border">
      <input type="text" placeholder="Scanner" className="text-center" key={items?.Station}
      onChange={handleChange}></input>
    </div>
  )
}

