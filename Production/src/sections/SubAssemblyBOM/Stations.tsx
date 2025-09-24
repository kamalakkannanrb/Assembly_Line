
import { useState,useEffect, useContext, RefObject, ChangeEvent } from "react"
import { Loader } from "../UtitliyComponents/Loader";
//API
import { getSASequence } from "../../api/getRecords";
//Types
import { SASequence,ContextItems,parts } from "../../types";
//Contexts
import { Items,SetItems,SetCurrentItems } from "../../context/context";

export function Stations({stationRef}:{stationRef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | {"Stations":string[],"Items":[SASequence]}>(null);
    const items=useContext(Items);
    const setItems=useContext(SetItems);
    const setCurrentItems=useContext(SetCurrentItems)
    useEffect(()=>{
        setData(null);
        (async () => {
            const res=await getSASequence(items?.["Sub Assembly ID"]);
            console.log(res);
            if(!res){
                setData(null);
                setItems?setItems(null):"";
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
        setCurrentItems && setCurrentItems([])
        const parts:parts[]=new Array<parts>();
        data?.Items[0].Parts.forEach((ele)=>{
            if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value && ele.Type_field=="Individual Part"){
                ele.Sequence_Required=="Yes"?parts.push({"Name":ele.Part_Name.Part_Name,"ID":ele.Part_Name.ID,"Prefix":ele.Traceability_Prefix,"Sequence":ele.Sequence_Number,"QC":"","Type":"in"}):parts.push({"Name":ele.Part_Name.Part_Name,"ID":ele.Part_Name.ID,"Prefix":ele.Traceability_Prefix,"Sequence":data.Items[0].Parts.length.toString(),"QC":"","Type":"in"});
            }
            else if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value && ele.Type_field=="Bin Part"){
                ele.Sequence_Required=="Yes"?parts.push({"Name":ele.Part_Name.Part_Name,"ID":ele.Part_Name.ID,"Prefix":null,"Sequence":ele.Sequence_Number,"QC":"","Type":"bin"}):parts.push({"Name":ele.Part_Name.Part_Name,"ID":ele.Part_Name.ID,"Prefix":null,"Sequence":data.Items[0].Parts.length.toString(),"QC":"","Type":"bin"});
            };
        });
        console.log(parts);
        parts.sort((a,b)=>(Number.parseInt(a.Sequence)-Number.parseInt(b.Sequence)));
        if(data && setItems && parts){
            
            setItems((pre:ContextItems | null)=>{
                if(pre!=null){
                    return {...pre,"Station":e.target.value,"Parts":parts,"Sub Assembly BOM Prefix":data.Items[0].Sub_Assembly_BOM_Prefix}
                }
                else{
                    return null;
                }
            });
        }
    }

   if(data!=null){
        return(<select onChange={handleChange} ref={stationRef} className="border rounded-3xl p-1.5 text-center 
        hover:bg-blue-200 hover:duration-200 
        focus:bg-blue-200">
            <option value="" defaultChecked>Choose a Station</option>
            {data?.Stations.map((ele,index)=><option key={index}>{ele}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}