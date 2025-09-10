
import { useContext } from "react"
import { Items } from "../BentoGrid"
//Types
import { ContextItems } from "../../types";

export function Bin(){
    const items:ContextItems | null=useContext(Items);
    return(
        <div>
            <h1 className="font-bold">Current Bin</h1>
            <ol>
                {items?.["Bin Parts"] && items["Bin Parts"].map((ele,index)=>(<li key={index}>{ele[0]}</li>))}
            </ol>
            <button className="border cursor-pointer">Replace Bin</button>
        </div>
    )
}