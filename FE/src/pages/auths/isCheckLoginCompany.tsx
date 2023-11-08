import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

const IsCheckLoginCompany = () => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const navigate = useNavigate();
    const [isLogin] = useState(() => {
        const user = localStorage.getItem("authCompany");
        return user ? user : null;
    });
    useEffect(() => {
        if (!isLogin) {
            notyf.error("Bạn phải đăng nhập mới có thể vào trang");
            navigate('/business/signin')
        }
    }, [])
    return (
        <Outlet />
    )
}

export default IsCheckLoginCompany