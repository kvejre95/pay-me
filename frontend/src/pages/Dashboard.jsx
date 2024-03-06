import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router-dom"
import {useEffect} from "react"

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/signin');
        }
    }, [navigate]);


    return <div>
        <Appbar />
        <div className="m-8">
            <Balance/>
            <Users />
        </div>
    </div>
}