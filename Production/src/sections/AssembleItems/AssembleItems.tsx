
import { useContext, useEffect, useState } from "react";
import { Items } from "../BentoGrid";

export function AssembleItems(){
    const items=useContext(Items);
    const[data,setData]=useState(null);
    useEffect(()=>{
        const arr=new Array();
        items?.["Bin Parts"]?.forEach((ele)=>arr.push(ele));
        items?.["Individual Parts"]?.forEach((ele)=>arr.push(ele));
        arr.sort((a,b)=>a[1]-b[1]);
        console.log(arr);
    },[items?.["Bin Parts"],items?.["Individual Parts"]]);
    
    return(
        <>
            <h1 className="font-bold">Assemble Items</h1>
        </>
    )    
}