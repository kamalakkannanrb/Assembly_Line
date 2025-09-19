
import { useContext } from "react"

//Contexts
import { Items } from "../../context/context";
//Types
import { ContextItems } from "../../types";

export function Bin(){
    const items:ContextItems | null=useContext(Items);
    return(
        <>
            <h1 className="font-bold text-center">Current Bin</h1>
            <ol>
                {items?.Parts && items.Parts.map((ele,index)=>{
                    if(ele.Type=="bin")return(<li key={index} className=" text-center text-red-600">{ele.Name}</li>)
                })}
            </ol>
        </>
    )
}