import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useActive_cvMutation, useAddCvMutation, useDelete_cvMutation, useListCvQuery } from '../../../api/cv/listCvApi';
import { Notyf } from 'notyf';
import { GoTrash } from 'react-icons/go';
import { CgEye } from 'react-icons/cg';
import { CiEdit } from 'react-icons/ci';

const ListCV = () => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data } = useListCvQuery();
    const listCv = data?.data;
    //tạo
    const [CreateCV] = useAddCvMutation();

    //delete
    const [deleteCV] = useDelete_cvMutation();
    const handleDelete = async (id: any) => {
        const confilm = window.confirm("Bạn có muốn xóa CV không ?");
        if (confilm) {
            try {
                await deleteCV(id).unwrap();
                notyf.success('Xóa thành công')
            } catch (error) {
                notyf.error("Xóa thất bại")
            }
        }
    }
    //active cv
    const [ActiveCv] = useActive_cvMutation();
    const handleActive = async (data: any) => {
        try {
            await ActiveCv(data).unwrap();
            notyf.success('Chọn cv chính thành công thành công!')
        } catch (error) {
            notyf.error('Bạn đã chọn cv này rồi!')
        }
    }
    return (

        <div className=''>
            {listCv ? (
                <div className='border border-solid border-gray-300 rounded px-5 w-[800px]'>
                    <h2 className='text-2xl text-center my-10'>Danh sách CV</h2>
                    <div className='grid grid-cols-3 gap-5 '>
                        {listCv?.map((item: any) => {
                            return (
                                <div className=' shadow-sm shadow-blue-300 border h-auto py-4 px-3'>
                                    <p>Tên Cv : {item?.title}</p>
                                    <div className='flex justify-center items-center gap-2 my-2'>
                                        <button onClick={() => handleDelete(item?.id)} className='text-red-500 font-semibold '><GoTrash /></button>
                                        <Link to=""><CgEye /></Link>
                                        <Link to=""><CiEdit /></Link>
                                    </div>
                                    <button
                                        className='text-white bg-blue-500 px-3 py-2 rounded '
                                        onClick={() => handleActive(item)}
                                    >Chọn làm cv chính</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='text-center m-5'>
                        <Link to={`/tao-cv`} className='text-white bg-blue-500 px-3 py-2 rounded '>Thêm CV</Link>
                    </div>
                </div>

            ) : (
                <div className='flex justify-between shadow-sm shadow-blue-300 h-auto py-4'>
                    <div className='mt-10 pt-5 w-3/5 ml-10 mr-16'>
                        <b className='text-2xl'>Tạo CV đầu tiên trên IT Careers</b>
                        <p className='text-lg'>
                            Bạn đang muốn tạo ấn tượng tốt với nhà tuyển dụng trước lúc đi phỏng vấn?
                        </p>
                        <p className='text-lg'>Hãy dùng thử mẫu cv đẹp chuyên nghiệp và hiện đại trên IT Careers.</p>
                        <p className='text-lg'>Chúng tôi đồng hành cùng tạo cv toả sáng với nhà tuyển dụng</p>
                        <Button
                            type='primary'
                            className='bg-blue-600 text-white text-lg h-12'
                        >
                            <Link to="/tao-cv">
                                Tạo CV đầu tiên
                            </Link>
                        </Button>
                    </div>
                    <div className='w-52 ml-5'>
                        <img src="https://123job.vn/images/banner/create-first-resume-logo.png" alt="" />
                    </div>
                </div>

            )}
        </div>
    )
}

export default ListCV