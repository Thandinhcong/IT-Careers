import { useGetAreaAllQuery } from '../../../api/areaApi'

const TopArea = () => {
    const { data } = useGetAreaAllQuery();
    const listAreaTop = data?.job_list || [];
    const sortedListAreaTop = [...listAreaTop]?.sort((a: any, b: any) => b?.job_count - a?.job_count);

    return (
        <div className='mb-10 rounded-2xl'>
            <h2 className='text-2xl'>Các khu vực <span className='text-blue-500'> hàng đầu</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {sortedListAreaTop ? (
                    sortedListAreaTop.map((item: any) => (
                        <div key={item?.id} className='shadow-md mt-10'>
                            <img
                                src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1702398408/hinh-nen-thanh-pho-ve-dem-dep-nhat_oivwxu.jpg"
                                className='rounded-t-2xl mb-2'
                                alt=""
                            />
                            <div className='font-semibold px-2 my-2 hover:text-blue-500'>{item?.province}</div>
                            <p className='p-2'>{item?.job_count} việc làm</p>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default TopArea