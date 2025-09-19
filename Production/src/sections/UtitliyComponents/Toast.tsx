import { useEffect } from "react"


export function Toast({close,message}:{close:any,message:any}){
    useEffect(()=>{
        setTimeout(() => {
            close(false);
        }, 3000);
    },[])
    return(
        <div className="fixed top-2 right-2 border rounded-lg p-1 bg-red-500">
            <h1>{message}</h1>
            <span><img src="error.svg"></img></span>
        </div>
    )
}