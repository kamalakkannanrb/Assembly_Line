
import { useState,useEffect, useContext, RefObject, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Loader } from "../UtitliyComponents/Loader";
//API
import { getSASequence } from "../../api/getRecords";
//Types
import { SASequence,ContextItems,parts } from "../../types";
//Contexts
import { Items,SetItems,SetCurrentItems } from "../../context/context";

export function Stations({stationRef,setScan}:{stationRef:RefObject<HTMLSelectElement | null>,setScan:Dispatch<SetStateAction<boolean>>}){
    const[data,setData]=useState<null | {"Stations":string[],"Main Station":string,"Items":[SASequence]}>(null);
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
                setItems && setItems(null);
                return;
            }
            const stations:string[]=[];
            var main="";
            res[0]?.Parts?.forEach((ele)=>{
                if(!stations.includes(ele.Station_Number)){
                    stations.push(ele.Station_Number);
                }
                if(ele.Main_Station=="true")main=ele.Station_Number;
                return
            })
            stations.sort();
            setData({"Items":res,"Main Station":main,"Stations":stations})
        })();
    },[items?.["Sub Assembly ID"]])

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        setCurrentItems && setCurrentItems({"Already":[],"Current":[],"Pointer":0,"ID":""})
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
        data && data["Main Station"]!=e.target.value && e.target.value!=""?setScan(true):setScan(false);
        data && setItems && parts && setItems((pre:ContextItems | null)=>{
            if(pre!=null){
                return {...pre,"Station":e.target.value,"Parts":parts,"Main Station":data["Main Station"]==e.target.value?"true":"false","Sub Assembly BOM Prefix":data.Items[0].Sub_Assembly_BOM_Prefix}
            }
            else{
                return null;
            }
        });
    }

   if(data!=null){
        return(
            <select onChange={handleChange} ref={stationRef} className="rounded-lg bg-gray-100 p-1.5 text-center
            focus:border-0">
                <option value="" defaultChecked>Choose a Station</option>
                {data?.Stations.map((ele,index)=><option key={index}>{ele}</option>)}
            </select>
        );
    }
    else{
        return <Loader/>
    }

}