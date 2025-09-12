
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
                {items?.["Bin Parts"] && items["Bin Parts"].map((ele,index)=>(<li key={index} className=" text-center text-red-600">{ele[0]}</li>))}
            </ol>
            <button className="text-center cursor-pointer border rounded-xl p-2 bg-red-300">Replace Bin</button>
        </>
    )
}