
import { ChangeEvent, useContext, useState } from "react"

//Context
import { MasterContext,SetMasterContext } from "../../context/context";

//API
import { addRedTag } from "../../api/addRecords";

//UtilityFunction
import { addActivity } from "../../utilityFunctions/activityLog";

export function RedTag(){
    const master=useContext(MasterContext);
    const setMaster=useContext(SetMasterContext);
    const[data,setData]=useState({"QC_ID":"","Quantity":0});

    function handleScan(e:ChangeEvent<HTMLInputElement>){
        setData({"QC_ID":e.target.value,"Quantity":0});
    }

    function handleQuantity(e:ChangeEvent<HTMLInputElement>){
        setData((pre)=>({...pre,"Quantity":Number.parseInt(e.target.value)}))
    }

    function handleSubmit(){
        addRedTag({
            "data":[
                {
                    ...data
                }
            ]
        })
        addActivity({"code":"alert","text":"Red tag added"})
        setData({"QC_ID":"","Quantity":0})
    }
    if(master["Red Tag"]){
        return(
            <div className="fixed h-screen w-screen top-0 left-0 z-20 bg-red-300 animate-slideRight">
                {/* <span className="absolute -left-3.5 top-[43%] hover:scale-115"><svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 -960 960 960" fill="#fb2c36"><path d="M384-96 0-480l384-384 68 68-316 316 316 316-68 68Z"/></svg></span> */}
                <span className="absolute right-10 top-10 bg-white p-2 rounded-2xl
                hover:bg-green-400" onClick={()=>setMaster && setMaster({type:"Disable_Red_Tag"})}>Close</span>
                <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                    <h1 className="text-center font-bold text-2xl">Red Tag</h1>
                    <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-25 rounded-2xl"/>
                    <input type="text" className="text-center bg-white border border-gray-400 rounded-2xl p-1" autoComplete="off" autoFocus placeholder="Scanner" onChange={handleScan} value={data.QC_ID}></input>
                    <input type="number" className="text-center bg-white border border-gray-400 p-1 rounded-2xl" autoComplete="off" placeholder="Quantity" onChange={handleQuantity} value={data.Quantity}></input>
                    {data.QC_ID.length>0 && data.Quantity!=null && <button type="submit" className="bg-white border border-gray-400 rounded-2xl p-2
                    hover:bg-green-400" onClick={handleSubmit}>Submit</button>}
                </div>
            </div>
        )
    }
    else{
        return(
            <span className="fixed right-1 top-[25%] hover:scale-115" onClick={()=>setMaster && setMaster({type:"Enable_Red_Tag"})}><svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 -960 960 960" fill="#fb2c36"><path d="M384-96 0-480l384-384 68 68-316 316 316 316-68 68Z"/></svg></span>
        )
    }
}