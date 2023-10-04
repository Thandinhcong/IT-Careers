import { Tabs } from 'antd';
import { AiFillInfoCircle, AiOutlineEye, AiOutlineFileText, AiOutlineHeart } from 'react-icons/ai'
import SaveJob from './SaveJob';
import MainFindJob from './Main';

const FindJob = () => {
    return (
        <div className='bg-gray-100'>
            <div className='max-w-[1050px] mx-auto py-7'>
                <div className='bg-[#d4f1f5] border border-[#b5edf5] p-4 text-[#06889b] leading-10'>
                    <p className='font-semibold flex items-center gap-2'>
                        <AiFillInfoCircle className="text-xl" />
                        <span> Kết nối ứng viên</span>
                    </p>
                    <p className='text-sm'>Trực tiếp kết nối với ứng viên chất lượng có nhu cầu trong ngày giúp bạn tuyển dụng nhanh chóng, tiện lợi dễ dàng hơn trong quá trình tuyển dụng</p>
                </div>
                <div className='bg-white px-4 pt-4 my-4'>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane key="1" tab={<span className='text-base text-[#526484] font-normal'>Tất cả</span>}>
                            <MainFindJob />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="2"
                            tab={<p className='flex items-center gap-2 text-base text-[#526484] font-normal'>
                                <AiOutlineHeart /><span>NTV đã lưu</span></p>}>
                            <SaveJob />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="3"
                            tab={<p className='flex items-center gap-2 text-base text-[#526484] font-normal'>
                                <AiOutlineEye /><span>NTV đã mở</span></p>}>
                            <MainFindJob />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="4"
                            tab={<p className='flex items-center gap-2 text-base text-[#526484] font-normal'>
                                <AiOutlineFileText /><span>Ứng viên của tôi</span></p>}>
                            <MainFindJob />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default FindJob