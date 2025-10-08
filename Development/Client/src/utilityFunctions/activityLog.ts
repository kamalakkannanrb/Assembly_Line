
export function addActivity(code:"success" | "fail"){
    const time=new Date();
    const nodes={
        "success":{
            "div":"flex items-center p-1 my-3 border border-green-400 rounded-lg bg-green-200",
            "span1":"w-2.5 h-2.5 mx-2 shrink-0 bg-green-600 rounded-full",
            "p":"grow",
            "span2":"mx-2 shrink-0 font-extralight text-xs"
        },
        "fail":{
            "div":"flex items-center p-1 my-3 border border-red-400 rounded-lg bg-red-200",
            "span1":"w-2.5 h-2.5 mx-2 shrink-0 bg-red-600 rounded-full",
            "p":"grow",
            "span2":"mx-2 shrink-0 font-extralight text-xs"
        }
    }
    const activity=document.getElementById("ActivityLog");
    const div=document.createElement('div');
    div.className=nodes[code].div;
    const span1=document.createElement('span');
    span1.className=nodes[code].span1;
    const p=document.createElement('p');
    p.className=nodes[code].p;
    p.innerText="New part";
    const span2=document.createElement('span');
    span2.className=nodes[code].span2;
    span2.innerText=time.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true});
    div.appendChild(span1);
    div.appendChild(p);
    div.appendChild(span2);
    activity && activity?.appendChild(div);
    console.log(activity);
}

export function clearActivity(){
    const activity=document.getElementById("ActivityLog");
    if(activity)activity.innerText="";
}