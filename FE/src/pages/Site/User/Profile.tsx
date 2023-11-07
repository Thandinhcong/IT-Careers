import { Avatar, Button } from 'antd'
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom'
import { Dropdown, Space } from 'antd';
import { AiOutlineDown, AiOutlinePlus } from 'react-icons/ai';
import { useGetInfoUserQuery } from '../../../api/auths';


const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link target="_blank" rel="noopener noreferrer" to="#">
                Thông tin cá nhân
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link target="_blank" rel="noopener noreferrer" to="#">
                Trình độ
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link target="_blank" rel="noopener noreferrer" to="#">
                Công việc quan tâm và mong muốn
            </Link>
        ),
    },
    {
        key: '4',
        label: (
            <Link target="_blank" rel="noopener noreferrer" to="#">
                Kỹ năng
            </Link>
        ),
    },
    {
        key: '5',
        label: (
            <Link target="_blank" rel="noopener noreferrer" to="#">
                Thành tựu
            </Link>
        ),
    },

];


const Profile = () => {

    const { data } = useGetInfoUserQuery();
    const listInfo = data?.candidate;
    const listImage = data?.candidate?.image;
    return (
        <div className='h-[1240px]'>
            <div className='shadow-sm shadow-blue-300 h-[450px]'>
                <div className="relative h-[250px]">
                    <div className="relative w-full h-full">
                        <img src="https://123job.vn/images/profile/background_profile.png" alt="" className='w-[832px]' />
                        <div className="absolute bottom-0 left-0 translate-x-[35%] translate-y-[70%]">
                            {listImage ? (
                                <Avatar
                                    size={100}
                                    src={data?.candidate?.image}
                                    className="avatar"
                                />

                            ) : (
                                <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" width={100} alt="icon" className='rounded-full' />
                            )}
                        </div>
                    </div>
                </div>
                <div className='absolute translate-x-[15%] translate-y-[80%]'>
                    <p className='text-2xl'>{listInfo?.name}</p>
                    <div className='my-1'>
                        <Link to='/contact' className='text-blue-500 text-lg'>Liên hệ</Link>
                    </div>
                    <div>
                        <Dropdown menu={{ items }}>
                            <Button
                                onClick={(e) => e.preventDefault()}
                                type='primary'
                                className='bg-blue-500 border rounded-full'>
                                <Space className=''>
                                    Thêm mục
                                    <AiOutlineDown />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div>
                <div className='shadow-sm shadow-blue-300 mt-8'>
                    <div className='m-5'>
                        <h1 className='text-2xl text-gray-700'><b>Giới thiệu</b></h1>
                        <div className='text-center'>
                            <p className='text-gray-500 mt-7'>
                                Cập nhật thông tin cá nhân giúp NTD dễ dàng liên lạc với bạn khi bạn là người được chọn.
                            </p>
                            <Button
                                className='text-blue-500 border-none my-2 text-lg'
                            >
                                <b className='flex items-center'><AiOutlinePlus />Thêm mô tả bản thân</b>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='shadow-sm shadow-blue-300 mt-8'>
                    <div className='m-5'>
                        <h1 className='text-2xl text-gray-700'><b>Học vấn và bằng cấp</b></h1>
                        <div className='text-center m-4'>
                            <p className='text-gray-500 mt-7'>
                                Hãy giúp nhà tuyển dụng hiểu rõ hơn về bạn. Thông tin về quá trình học vấn sẽ giúp tăng cơ hội phỏng vấn của bạn đến 23%.
                            </p>
                            <Button
                                className='text-blue-500 border-none my-2 text-lg'
                            >
                                <b className='flex items-center'><AiOutlinePlus />Thêm trình độ học vấn</b>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='shadow-sm shadow-blue-300 mt-8'>
                    <div className='m-5'>
                        <h1 className='text-2xl text-gray-700'><b>Kinh nghiệm làm việc</b></h1>
                        <div className='text-center m-4'>
                            <p className='text-gray-500 mt-7'>
                                77,9% nhà tuyển dụng được khảo sát coi kinh nghiệm làm việc là dữ liệu quan trọng trong các trong các hồ sơ ứng tuyển. Vì vậy, hãy chắc chắn điền vào phần này để đảm bảo tăng cơ hội được phỏng vấn
                            </p>
                            <Button
                                className='text-blue-500 border-none my-2 text-lg'
                            >
                                <b className='flex items-center'><AiOutlinePlus />Thêm kinh nghiệm làm việc</b>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='shadow-sm shadow-blue-300 mt-8'>
                    <div className='m-5'>
                        <h1 className='text-2xl text-gray-700'><b>Kỹ năng chuyên môn</b></h1>
                        <div className='text-center m-4'>
                            <p className='text-gray-500 mt-7'>
                                Giờ không phải là lúc tỏ ra khiêm nhường. Hãy chia sẻ những điểm mạnh nhất của bạn để thu hút những nhà tuyển dụng hàng đầu.
                            </p>
                            <Button
                                className='text-blue-500 border-none my-2 text-lg'
                            >
                                <b className='flex items-center'><AiOutlinePlus />Thêm kỹ năng</b>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile