import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import { useGetInfoManaWebsiteQuery } from '../../api/manageWebsiteApi/manageWebApi';
import { Skeleton } from 'antd';
import React from 'react';

const Layout = React.memo(() => {
    const { data, isLoading } = useGetInfoManaWebsiteQuery();
    const listInfoWeb = data?.data[0];
    if (isLoading) return <Skeleton className='w-full h-full  col-span-2' />
    return (
        <div>
            <div className='fixed top-0 left-0 right-0 mb-10 bg-white  z-50'>
                <Header data={listInfoWeb} />
            </div>
            <div className='mt-28'>
                <Outlet />

            </div>
            <Footer dataFooter={listInfoWeb} />
        </div>
    )
});

export default Layout