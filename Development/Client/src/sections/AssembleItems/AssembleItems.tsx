
import { useContext } from "react";

//Contexts
import { MasterContext, ScannedContext } from "../../context/context";


export function AssembleItems(){

    const master=useContext(MasterContext)
    const scanned=useContext(ScannedContext);
    
    return(
        <div className="BottomBoxes grow">
            <h1>Assemble Items</h1>
            <div className="h-[90%] p-3 overflow-auto">
                {/* <ol>
                    {scanned?.Parts && scanned.Parts.map((ele,index)=>(<li key={index} className={`text-start font-medium ${ele.Type=="bin"?"text-blue-600":"text-green-600"}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline text-black"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg> {ele.Name} - {ele.Prefix} - {scanned?.Current[index]?.QC}</li>))}
                </ol> */}
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="font-bold">
                            <td className="w-[40%]">Name</td>
                            <td>Quantity</td>
                            {/* <td>Prefix</td> */}
                            <td>QC ID</td>
                            <td>QC Quantity</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {master?.Parts && Object.values(master.Parts).map((ele,index)=>{
                            return <tr key={index}>
                                {/*text-blue-600":"text-green-600"*/}
                                <td><span className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00a63e"><path d="M216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-412q-21-8-34.5-26.5T96-648v-144q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v144q0 23-13.5 41.5T816-580v411.86Q816-138 794.85-117T744-96H216Zm0-480v408h528v-408H216Zm-48-72h624v-144H168v144Zm216 240h192v-72H384v72Zm96 36Z"/></svg> </span> {ele.Name}</td>
                                <td>{ele.Quantity}</td>
                                <td>{scanned?.Current[ele.ID]?.QC.map((item)=>(<><span>{item?.QC_Name} - {item?.Quantity}</span><br/></>))}</td>
                                <td>0</td>
                                {scanned?.Pointer>index && <td data-last><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#00a63e"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z"/></svg></td>}
                                {scanned?.Pointer<=index && <td><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F19E39"><path d="M324-168h312v-120q0-65-45.5-110.5T480-444q-65 0-110.5 45.5T324-288v120ZM192-96v-72h60v-120q0-59 28-109.5t78-82.5q-49-32-77.5-82.5T252-672v-120h-60v-72h576v72h-60v120q0 59-28.5 109.5T602-480q50 32 78 82.5T708-288v120h60v72H192Z"/></svg></td>}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
        
}