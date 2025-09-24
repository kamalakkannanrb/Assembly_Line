import { useEffect, useState } from "react"


export function PopUp({close}:{close:any}){
    const[time,setTime]=useState(3);
    useEffect(()=>{
        const id1=setTimeout(() => {
            close(false);
        },3000);
        const id2=setInterval(() => {
            setTime(pre=>pre-1);
        }, 1000);
        // console.log(id1);
        return ()=>{
            clearTimeout(id1)
            clearInterval(id2);
        }
    },[])
    return(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50">
            <div className="relative w-1/3 h-1/3 flex flex-col justify-center items-center border rounded-4xl bg-white">
                <h1 className="absolute top-4 right-4 font-extrabold">{time}</h1>
                <h1 className="text-green-700 text-4xl text-center">Data submitted</h1>
                <svg width="60px" height="60px" viewBox="0 0 15 15" fill="none" className="mt-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7.5L7 10L11 5M7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5Z" stroke="#000000"/>
                </svg>
            </div>
        </div>
    )
}