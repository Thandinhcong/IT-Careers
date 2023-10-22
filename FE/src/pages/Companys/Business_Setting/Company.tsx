import { Button } from 'antd'
import { useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineUpload } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';


const CompanySetting = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [formValues, setFormValues] = useState({
        company_name: 'Tập Đoàn FPT',
        tax_code: '10310231321',
        address: '42750 Kiera Rest Apt. 986\nPort Rosalynborough, WA 26766',
        founded_in: '2016-05-05',
        name: 'Đinh Hữu Thế',
        office: 'Trịnh Văn Bô',
        email: 'thedh@gmail',
        phone: '0886479387',
        map: '2000 Kovacek Ford\nBruenmouth, RI 38700-9853',
        logo: 'C:\\Users\\admin\\AppData\\Local\\Temp\\da5fd6cae85d6b60d3cf511401d1a950.png',
        link_web: 'link_web',
        image_paper: 'C:\\Users\\admin\\AppData\\Local\\Temp\\a6df36ebeb44f1fcace5a15fc53dc90d.png',
        desc: 'aaaaaaaaaaaaaaaaaaaaaa',
    });


    useEffect(() => {
        const savedCompanyInfo = localStorage.getItem('userCompanyInfo');
        if (savedCompanyInfo) {
            setFormValues(JSON.parse(savedCompanyInfo));

        }
    }, []);
    const handleChangeCompanyInfo = (key: string, value: string) => {
        setFormValues((prevState: any) => ({
            ...prevState,
            [key]: value,
        }));
    };
    return (
        <div>
            <h1 className='text-2xl'>Thông tin công ty</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>
                Mô tả chi tiết thông tin về công ty của bạn đang làm việc giúp ứng viên nắm được về công ty
            </p>
            <div>
                <span className='text-gray-500 text-lg'>Ảnh đại diện</span>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-20'>
                        <img src="" />
                    </div>
                    <Button className='flex items-center'>
                        <AiOutlineUpload /> Thay đổi ảnh
                    </Button>
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Tên Công Ty</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.company_name}
                                onChange={e => handleChangeCompanyInfo('company_name', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.company_name}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Mã Số Thuế</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.tax_code}
                                onChange={e => handleChangeCompanyInfo('tax_code', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.tax_code}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Địa Chỉ</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.address}
                                onChange={e => handleChangeCompanyInfo('address', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.address}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Website</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.link_web}
                                onChange={e => handleChangeCompanyInfo('link_web', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.link_web}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Ngày Thành Lập</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.founded_in}
                                onChange={e => handleChangeCompanyInfo('founded_in', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.founded_in}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Số Điện Thoại</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.phone}
                                onChange={e => handleChangeCompanyInfo('phone', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.phone}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
                <div className='my-2'>
                    <span className='text-gray-500 text-lg'>Mô tả</span>
                    {formVisible ? (
                        <div className='flex justify-between items-center'>
                            <input
                                type='text'
                                value={formValues.desc}
                                onChange={e => handleChangeCompanyInfo('desc', e.target.value)}
                            />
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Lưu thông tin đã thay đổi và ẩn form
                                    localStorage.setItem('userCompanyInfo', JSON.stringify(formValues));
                                    setFormVisible(false);
                                }}
                            >
                                Lưu
                            </Button>
                        </div>
                    ) : (
                        <div className='flex justify-between items-center'>
                            <p>{formValues.desc}</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'
                                onClick={() => {
                                    // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                    setFormVisible(true);
                                }}
                            >
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};


export default CompanySetting