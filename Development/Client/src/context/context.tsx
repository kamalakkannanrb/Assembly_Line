
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ContextItems } from "../types";

export const Items=createContext<ContextItems | null>(null);
export const SetItems=createContext<Dispatch<SetStateAction<ContextItems | null>> | null>(null);
export const CurrentItems=createContext<{ "Name": string,"QC": string}[]>([]);
export const SetCurrentItems=createContext<Dispatch<SetStateAction<{ "Name": string, "QC": string }[]>>| null>(null);

export function ScannedItems({children}:{children:ReactNode}){
    const[data,setData]=useState<{ "Name": string, "QC": string}[]>([]);
    return(
        <CurrentItems value={data}>
            <SetCurrentItems value={setData}>
                {children}
            </SetCurrentItems>
        </CurrentItems>
    )
}