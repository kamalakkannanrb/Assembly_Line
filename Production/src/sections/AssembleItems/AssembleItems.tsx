
import { useContext, useEffect,useState } from "react";
import { Items } from "../BentoGrid";
import { Loader } from "../UtitliyComponents/Loader";

export function AssembleItems(){
    const items=useContext(Items);
    const[data,setData]=useState<Array<string[]> | null>(null);
    useEffect(()=>{
        const arr=new Array();
        items?.["Bin Parts"]?.forEach((ele)=>arr.push(ele));
        items?.["Individual Parts"]?.forEach((ele)=>arr.push(ele));
        if(arr.length==0){
            setData(null);
            return;
        }
        arr.sort((a,b)=>a[1]-b[1]);
        setData(arr);
        console.log(arr);
    },[items?.["Bin Parts"],items?.["Individual Parts"]]);
    
    if(data){
        return(
            <>
                <h1 className="font-bold">Assemble Items</h1>
                <ol>
                    {data.map((ele,index)=>(<li key={index} className={`text-center ${ele[2]=="bin"?"text-red-600":"text-green-600"}`}>{ele[0]}</li>))}
                </ol>
            </>
        )
    }
    return(
        <>
            <h1 className="font-bold">Assemble Items</h1>
            <Loader/>
        </>
    ) 
        
}