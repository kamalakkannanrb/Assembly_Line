
import { useState,useEffect } from "react"
import { Loader } from "../UtitliyComponents/Loader";
import { getSASequence } from "../../API/getRecords";
import { SASequence } from "../../types";

export function Stations({setStation,SAID}:any){
    const[data,setData]=useState<null | {"Stations":String[],"Items":[SASequence],}>(null);
    useEffect(()=>{
        setStation(null);
        (async () => {
            const res=await getSASequence(SAID);
            console.log(res);
            if(!res){
                setData(null);
                setStation(null);
                return;
            }
            const stations:String[]=[];
            res[0]?.Parts?.forEach((ele)=>{
                if(!stations.includes(ele.Station_Number))stations.push(ele.Station_Number);
                return
            })
            stations.sort();
            setData({"Items":res,"Stations":stations})
        })();
    },[SAID])

    //@ts-ignore
    function handleChange(e){
        const individual:String[]=[];
        const bin:String[]=[];
        data?.Items[0].Parts.forEach((ele)=>{
            if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value && ele.Type_field=="Individual Part")individual.push(ele.Part_Name.Part_Name);
            else if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value && ele.Type_field=="Bin Part")bin.push(ele.Part_Name.Part_Name);
        });
        setStation({"Station":e.target.value,"Individual":individual,"Bin":bin});
    }

   if(data!=null){
        return(<select onChange={handleChange}>
            <option value="" defaultChecked>Choose a Station</option>
            {data?.Stations.map((ele,index)=><option key={index}>{ele}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}