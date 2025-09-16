
import { useContext} from "react";
import { Loader } from "../UtitliyComponents/Loader";

//Contexts
import { Items } from "../../context/context";


export function AssembleItems(){
    const items=useContext(Items);
    // const[data,setData]=useState<Array<{"Name":string,"Prefix"?:string,"Sequence":string,"Type":"in" | "bin"}> | null>(null);

    // useEffect(()=>{
    //     const arr=new Array();
    //     items?.["Bin Parts"]?.forEach((ele)=>arr.push(ele));
    //     items?.["Individual Parts"]?.forEach((ele)=>arr.push(ele));
    //     if(arr.length==0){
    //         setData(null);
    //         return;
    //     }
    //     arr.sort((a,b)=>a.Sequence-b.Sequence);
    //     setData(arr);
    //     console.log(arr);
    // },[items?.["Bin Parts"],items?.["Individual Parts"]]);
    
    if(items?.Parts){
        return(
            <>
                <h1 className="font-bold">Assemble Items</h1>
                <ol>
                    {items.Parts.map((ele,index)=>(<li key={index} className={`text-center ${ele.Type=="bin"?"text-red-600":"text-green-600"}`}>{ele.Name} - {ele.Prefix}</li>))}
                </ol>
            </>
        )
    }
    return(
        <>
            <h1 className="font-bold">Assemble Items</h1>
            <Loader/>
        </>
    ) 
        
}