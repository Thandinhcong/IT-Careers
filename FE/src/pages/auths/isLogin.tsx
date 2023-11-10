import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const IsLogin = () => {
  const navigate = useNavigate();
  const [isLogin] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    if (isLogin) return navigate('/')
  }, [])
  return (
    <div><Outlet /></div>
  )
}

export default IsLogin