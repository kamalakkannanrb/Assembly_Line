
import { useState,useEffect, useContext, RefObject, ChangeEvent } from "react"
import { Loader } from "../UtitliyComponents/Loader";
//API
import { getSASequence } from "../../api/getRecords";
//Types
import { SASequence,ContextItems } from "../../types";
//Contexts
import { Items,SetItems } from "../../context/context";

export function Stations({stationRef}:{stationRef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | {"Stations":string[],"Items":[SASequence],}>(null);
    const setItems=useContext(SetItems);
    const items=useContext(Items);
    useEffect(()=>{
        setData(null);
        (async () => {
            const res=await getSASequence(items?.["Sub Assembly ID"]);
            console.log(res);
            if(!res){
                setData(null);
                setItems(null);
                return;
            }
            const stations:string[]=[];
            res[0]?.Parts?.forEach((ele)=>{
                if(!stations.includes(ele.Station_Number))stations.push(ele.Station_Number);
                return
            })
            stations.sort();
            setData({"Items":res,"Stations":stations})
        })();
    },[items?.["Sub Assembly ID"]])

    
    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        const individual:Array<string[]>=new Array();
        const bin:Array<string[]>=new Array();
        data?.Items[0].Parts.forEach((ele)=>{
            if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value && ele.Type_field=="Individual Part"){
                ele.Sequence_Required=="Yes"?individual.push([ele.Part_Name.Part_Name,ele.Sequence_Number,"in"]):individual.push([ele.Part_Name.Part_Name,"0","in"]);
            }
            else if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value && ele.Type_field=="Bin Part"){
                ele.Sequence_Required=="Yes"?bin.push([ele.Part_Name.Part_Name,ele.Sequence_Number,"bin"]):bin.push([ele.Part_Name.Part_Name,"0","bin"]);
            };
        });
        // console.log(individual);
        // console.log(bin);
        setItems((pre:null | ContextItems)=>({...pre,"Station":e.target.value,"Individual Parts":individual,"Bin Parts":bin,"Sub Assembly BOM Prefix":data?.Items[0].Sub_Assembly_BOM_Prefix}));
    }

   if(data!=null){
        return(<select onChange={handleChange} ref={stationRef}>
            <option value="" defaultChecked>Choose a Station</option>
            {data?.Stations.map((ele,index)=><option key={index}>{ele}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}