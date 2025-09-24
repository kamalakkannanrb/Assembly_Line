

export function Loading(){
    return(
        <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black/50 flex flex-col justify-center items-center">
            <h1 className="font-bold text-center text-4xl mb-5">Please wait</h1>
            <div className="w-[50px] h-[50px] border-4 rounded-full border-b-blue-500 animate-spin"></div>
        </div>
    )
}