
type params={
    code:"success" | "fail" | "alert",
    text:string   
}

export function addActivity(arg:params){
    const time=new Date();
    const nodes={
        "success":{
            "div":"flex items-center p-1 my-3 border border-green-200 rounded-lg bg-green-100",
            "span1":"w-2.5 h-2.5 mx-2 shrink-0 bg-green-500 rounded-full",
            "p":"grow",
            "span2":"mx-2 shrink-0 font-extralight text-xs"
        },
        "fail":{
            "div":"flex items-center p-1 my-3 border border-amber-200 rounded-lg bg-amber-100",
            "span1":"w-2.5 h-2.5 mx-2 shrink-0 bg-amber-500 rounded-full",
            "p":"grow",
            "span2":"mx-2 shrink-0 font-extralight text-xs"
        },
        "alert":{
            "div":"flex items-center p-1 my-3 border border-amber-200 rounded-lg bg-amber-100",
            "span1":"w-2.5 h-2.5 mx-2 shrink-0 bg-amber-500 rounded-full",
            "p":"grow",
            "span2":"mx-2 shrink-0 font-extralight text-xs"
        }
    }
    const activity=document.getElementById("ActivityLog");
    const div=document.createElement('div');
    div.className=nodes[arg.code].div;
    const span1=document.createElement('span');
    span1.className=nodes[arg.code].span1;
    const p=document.createElement('p');
    p.className=nodes[arg.code].p;
    p.style.wordBreak="break-word";
    p.innerText=arg.text;
    const span2=document.createElement('span');
    span2.className=nodes[arg.code].span2;
    span2.innerText=time.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true});
    div.appendChild(span1);
    div.appendChild(p);
    div.appendChild(span2);
    activity && activity?.appendChild(div);
    div.scrollIntoView({behavior:"smooth"});
    // console.log(activity);
}

export function clearActivity(){
    const activity=document.getElementById("ActivityLog");
    if(activity)activity.innerText="";
}