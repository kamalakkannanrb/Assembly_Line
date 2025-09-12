
import { createContext } from "react";
import { ContextItems } from "../types";

export const Items=createContext<null | ContextItems>(null);
export const SetItems=createContext<any>(null);