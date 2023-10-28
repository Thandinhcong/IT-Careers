import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate=useNavigate();
    const handleGoBack = () => {
        navigate(-1); 
      };
  return (
    <div className='text-center'>
        <h2 className='text-center mx-auto mt-40 mb-10 text-9xl text-zinc-500'>OPPS!</h2>
        <p className='text-lg mb-10'>Đường dẫn không tồn tại!</p>
        <button onClick={handleGoBack} className='text-white rounded border px-2 py-2 bg-blue-500'>Quay trở lại</button>
    </div>
  )
}

export default NotFound