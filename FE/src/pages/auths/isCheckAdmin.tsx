import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const IsCheckLoginAdmin = () => {
    const navigate = useNavigate();
    const [isLogin] = useState(() => {
        const user = localStorage.getItem("admin");
        return user ? JSON.parse(user) : null;
    });
    useEffect(() => {
        if (!isLogin) return navigate('/')
    }, [])
    return (
        <Outlet />
    )
}

export default IsCheckLoginAdmin