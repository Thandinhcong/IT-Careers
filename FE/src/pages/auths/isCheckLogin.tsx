import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const IsCheckLogin = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });
    useEffect(() => {
        if (!isLogin) return navigate('/')
    }, [])
    return (
        <Outlet />
    )
}

export default IsCheckLogin