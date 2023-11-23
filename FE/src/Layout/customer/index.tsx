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
        <>
            <Header data={listInfoWeb} />
            <Outlet />
            <Footer dataFooter={listInfoWeb} />
        </>
    )
});

export default Layout