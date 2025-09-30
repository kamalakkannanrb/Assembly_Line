
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ContextItems,ContextCurrentItems } from "../types";

export const Items=createContext<ContextItems | null>(null);
export const SetItems=createContext<Dispatch<SetStateAction<ContextItems | null>> | null>(null);
export const CurrentItems=createContext<ContextCurrentItems>({"Already":[],"Current":[],"Pointer":0,"ID":""});
export const SetCurrentItems=createContext<Dispatch<SetStateAction<ContextCurrentItems>> |null>(null);


export function ScannedItems({children}:{children:ReactNode}){
    const[currentItems,setCurrentItems]=useState<ContextCurrentItems>({"Already":[],"Current":[],"Pointer":0,"ID":""});
    return(
        <CurrentItems value={currentItems}>
            <SetCurrentItems value={setCurrentItems}>
                {children}
            </SetCurrentItems>
        </CurrentItems>
    )
}