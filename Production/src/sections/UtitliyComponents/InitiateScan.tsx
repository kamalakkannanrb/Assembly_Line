
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Toast } from "./Toast";

//Contexts
import { MasterContext, SetMasterContext, SetScannedContext } from "../../context/context";

//API
import { getSATraceability } from "../../api/getRecords";

type Items={ "Name": string,"ID":string,"QC_Name": string,"QC_ID":string,"Quantity":string}

export function InitiateScan(){
    useEffect(()=>{
        const scan=document.getElementById("InitiateScan");
        scan && scan.focus();
    },[])
    const[toast,setToast]=useState(false); 
    const master=useContext(MasterContext);
    const setMaster=useContext(SetMasterContext);
    const setScanned=useContext(SetScannedContext);

    async function handleChange(e:ChangeEvent<HTMLInputElement>){
        
        const data=await getSATraceability(e.target.value.trim());
        console.log(data);
        if(data && data[0].Sub_Assembly_BOM.ID==master["Sub Assembly ID"]){
            const arr:Items[]=[];
            data?.[0].Parts.forEach((ele)=>arr.push({"Name":ele.Part_Name.Item_Name,"ID":ele.Part_Name.ID,"QC_Name":ele.QC_ID.QC_ID,"QC_ID":ele.QC_ID.ID,"Quantity":ele.Quantity}))

            setScanned && setScanned({type:"Set_Already",data:{"Already":arr,"Current":[],"Pointer":0,"ID":data?.[0].ID}})

            const sticker=document.getElementById("Sticker");
            const scanner=document.getElementById("Scanner");
            if(sticker)sticker.innerText=e.target.value.trim();
            if(scanner)scanner.focus();

            setMaster && setMaster({type:"Make_Main_Staion_Null"})

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