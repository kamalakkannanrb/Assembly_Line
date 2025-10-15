
import { ChangeEvent, useContext,useEffect,useState } from "react";
import { Toast } from "./Toast";

//Contexts
import { SetItems, SetCurrentItems } from "../../context/context";

//API
import { getSATraceability } from "../../api/getRecords";

//Types
import { ContextItems } from "../../types";

export function InitiateScan(){
    useEffect(()=>{
        const scan=document.getElementById("InitiateScan");
        scan && scan.focus();
    },[])
    const[toast,setToast]=useState(false);    
    const setItems=useContext(SetItems);
    const setCurrentItems=useContext(SetCurrentItems);

    async function handleChange(e:ChangeEvent<HTMLInputElement>){
        const data=await getSATraceability(encodeURIComponent(e.target.value.trim()));
        console.log(data);
        if(data){
            const arr:{ "Name": string,"ID":string,"QC": string}[]=[];
            data?.[0].Parts.forEach((ele)=>arr.push({"Name":ele.Part_Name.Part_Name,"ID":ele.Part_Name.ID,"QC":ele.QC_ID}))
            setCurrentItems && setCurrentItems({"Already":arr,"Current":[],"Pointer":0,"ID":data?.[0].ID});
            const sticker=document.getElementById("Sticker");
            const scanner=document.getElementById("Scanner");
            if(sticker)sticker.innerText=e.target.value.trim();
            if(scanner)scanner.focus();
            setItems && setItems((pre:ContextItems | null)=>{
                if(pre!=null){
                    return {...pre,"Main Station":"null"}
                }
                else{
                    return null;
                }
            });
        }
        else{
            setToast(true);
        }
        e.target.value="";
    }
    return(
        <div className="fixed top-0 left-0 w-screen h-screen z-10 flex justify-center items-center bg-gray-500/80">
            <div className="w-1/4 h-1/3 flex flex-col gap-4 justify-center items-center rounded-3xl bg-white">
                <h1 className="text-center">Please scan the Sub Assembly ID</h1>
                <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-20 h-auto"/>
                <input type="text" id="InitiateScan" placeholder="scanner" autoFocus autoComplete="off" className="text-center border rounded-3xl p-2" onChange={handleChange}/>
            </div>
            {toast && <Toast close={setToast} message={"Wrong Sub assembly"}/>}
        </div>
    );
}