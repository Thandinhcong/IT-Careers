import { Tabs } from 'antd';
import TabMain from './TabMain';
import TabPostPendding from './TabPostPendding';
import TabPostPass from './TabPostPass';
import TabPostFail from './TabPostFail';
import TabPostExpired from './TabPostExpired';
import TabPostStop from './TabPostStop';
import React from 'react';
import TabPostVIP from './TabPostVIP';

const JobsManage = React.memo(() => {
    return (
        <div className='bg-gray-100 py-8 px-5'>
            <div className='max-w-[1100px] mx-auto bg-white p-4'>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane key="1" tab={<span className='text-base text-[#526484] font-medium'>Tất cả</span>}>
                        <TabMain />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="2"
                        tab={<p className=' text-base text-[#526484] font-medium'>
                            <span>Vip</span></p>}>
                        <TabPostVIP />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="3"
                        tab={<p className=' text-base text-[#526484] font-medium'>
                            <span>Đang tuyển</span></p>}>
                        <TabPostPass />
                    </Tabs.TabPane>
                    {/* <Tabs.TabPane key="4"
                        tab={<p className=' text-base text-[#526484] font-medium'>
                            <span>Dừng tuyển</span></p>}>
                        <TabPostStop />
                    </Tabs.TabPane> */}
                    <Tabs.TabPane key="5"
                        tab={<p className=' text-base text-[#526484] font-medium'>
                            <span>Chờ duyệt</span></p>}>
                        <TabPostPendding />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="6"
                        tab={<p className=' text-base text-[#526484] font-medium'>
                            <span>Không duyệt</span></p>}>
                        <TabPostFail />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="7"
                        tab={<p className=' text-base text-[#526484] font-medium'>
                            <span>Hết hạn</span></p>}>
                        <TabPostExpired />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
});

export default JobsManage