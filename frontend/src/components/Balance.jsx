import axios from "axios";
import { useEffect, useState } from "react"

export const Balance = ({ value }) => {
    const [amount, setAmount] = useState(0)

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response=>{
            setAmount(v => response.data.balance)
        })
    },[]); 

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {amount}
        </div>
    </div>
}