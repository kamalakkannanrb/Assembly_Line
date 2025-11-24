
import { useContext } from "react";
import { Loader } from "../../../../sections/UtitliyComponents/Loader";

//Context 
import { MainMasterContext } from "../../context/mainContext";

export function Items(){
    const mainMaster=useContext(MainMasterContext);
    if(mainMaster=="Loading")return <Loader/>

    return(
        <div className="w-9/10 max-h-full min-w-[700px] overflow-auto">
            <div>
                <div className="grid grid-cols-12 gap-3 px-6 py-4 sticky top-0 bg-white">
                    <div className="col-span-1 text-center font-bold">Type</div>
                    <div className="col-span-3 text-center font-bold">Name</div>
                    <div className="col-span-1 text-center font-bold">Required</div>
                    <div className="col-span-1 text-center font-bold">Current</div>
                    <div className="col-span-5 text-center font-bold">QC/Sub</div>
                    <div className="col-span-1 text-center font-bold">Status</div>
                </div>
                <div className="divide-y-1">
                    {Object.values(mainMaster.Parts).map((ele)=>{
                        return(
                            <div className="grid grid-cols-12 gap-3 px-6 py-5 bg-gray-200">
                                <div className="col-span-1 flex justify-center items-center">
                                    <span>{ele.Type_field=="Sub Assembly"?<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff29d0"><path d="M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00cdb8"><path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>}</span>
                                </div>
                                <div className="col-span-3 flex justify-center items-center">
                                    <p>{ele.Name}</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center text-center">
                                    <p>{ele.Required_Quantity}</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center text-center">
                                    <p>{ele.Quantity || 0}</p>
                                </div>
                                <div className="col-span-5 flex justify-center items-center">
                                    <p>{ele.Type_field=="Sub Assembly"?ele?.SA_Sticker:Object.values(ele.QC).map((ele)=>`${ele?.QC_ID} - ${ele?.Quantity} , `)}</p>
                                </div>
                                <div className="col-span-1 flex justify-center items-center text-center">
                                    <span>{ele.Status=="Completed"?<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00a63e"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q63 0 120 19t105 54l-52 52q-37-26-81-39.5T480-792q-130 0-221 91t-91 221q0 130 91 221t221 91q130 0 221-91t91-221q0-21-3-41.5t-8-40.5l57-57q13 32 19.5 67t6.5 72q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm-55-211L264-468l52-52 110 110 387-387 51 51-439 439Z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F19E39"><path d="M324-168h312v-120q0-65-45.5-110.5T480-444q-65 0-110.5 45.5T324-288v120ZM192-96v-72h60v-120q0-59 28-109.5t78-82.5q-49-32-77.5-82.5T252-672v-120h-60v-72h576v72h-60v120q0 59-28.5 109.5T602-480q50 32 78 82.5T708-288v120h60v72H192Z"/></svg>}</span>
                                </div>
                            </div>    
                        )
                    })}
                </div>
            </div>
        </div>
    )
    
}