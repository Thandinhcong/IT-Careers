import React from 'react'
import { CiSettings } from 'react-icons/ci';

const ManageWebsite = React.memo(({ data }: any) => {

    const listMajor = data?.countMajor;
    return (
        <div className="grid grid-cols-4 gap-5 mt-10">
            <div className="p-2 bg-green-500 flex gap-5 items-center">
                <div className='text-5xl text-white'>
                    <CiSettings />
                </div>
                <div>
                    <p className="text-2xl text-white">{listMajor?.length}</p>
                    <p className="mt-5 text-white">Tổng số chuyên ngành</p>
                </div>
            </div>


        </div>
    )
});

export default ManageWebsite