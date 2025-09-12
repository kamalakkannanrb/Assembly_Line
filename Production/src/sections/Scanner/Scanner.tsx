
import { ChangeEvent } from "react";


export function Scanner(){
  
  function handleChange(e:ChangeEvent<HTMLInputElement>){
    // set.add(e.target.value);
    console.log(e.target.value);
  }

  return(
    <div className="border">
      <input type="text" placeholder="Scanner" className="text-center"
      onChange={handleChange}></input>
    </div>
  )
}