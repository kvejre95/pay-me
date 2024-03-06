export function NameIcon({value}){
    return (
        <>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {value}
                </div>
            </div>
        </>
    )
}