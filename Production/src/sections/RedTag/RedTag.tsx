
import { ChangeEvent, useRef, MouseEvent, useState } from "react"

//API
import { addRedTag } from "../../api/addRecords";

//UtilityFunction
import { addActivity } from "../../utilityFunctions/activityLog";

export function RedTag(){
    const red=useRef<HTMLDivElement>(null);
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

    function invert(e:MouseEvent<HTMLSpanElement>){
        if(red.current){
            if(red.current.style.right=="-238px"){
                red.current.style.right="0";
                console.log(e.target)
            }
            else{
                red.current.style.right="-238px";
                console.log(e.target)

            }
        }
    }
    
    return(

        <div ref={red} style={{"right":"-238px"}} className="fixed h-[70vh] w-[240px] top-25 z-20 border border-red-300 rounded-l-4xl bg-red-300 duration-600">
            {/* <span onClick={invert} className="absolute -left-3.5 top-[43%] hover:scale-115"><svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 -960 960 960" fill="#fb2c36"><path d="M384-96 0-480l384-384 68 68-316 316 316 316-68 68Z"/></svg></span> */}
            <span onClick={invert} className="absolute -left-7.5 top-[42%] hover:scale-115"><svg xmlns="http://www.w3.org/2000/svg" height="45px" viewBox="0 -960 960 960" width="45px" fill="#fb2c36"><path d="M253-446q-9-6-13.5-15t-4.5-19q0-10 4.5-19t13.5-15l326-207q5-3 10.5-4.5T600-727q16 0 28 11.5t12 28.5v414q0 17-12 28.5T600-233q-5 0-10.5-1.5T579-239L253-446Zm307-34Zm0 134v-268L350-480l210 134Z"/></svg></span>

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