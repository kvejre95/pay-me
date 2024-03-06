import { NameIcon } from "./NameIcon"

export const Appbar = () => {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayME App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <NameIcon value = "U"/>
        </div>
    </div>
}