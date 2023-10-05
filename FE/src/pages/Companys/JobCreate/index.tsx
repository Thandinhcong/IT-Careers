import React from 'react'
import { Select, Space } from 'antd';
import { Link } from 'react-router-dom';



const JobCreate = () => {

    const { Option } = Select;
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };


    return (
        <div className='mt-16'>
            <p className='text-sm mx-10 py-4'>
                <Link to="" className='text-gray-500'>Bảng tin /</Link>
                <Link to="" className='text-gray-500'> Tin tuyển dụng /</Link>
                <span className='text-gray-300'> Thêm mới</span>
            </p>
            <div className='mx-10 border shadow p-7'>
                <h2 className='text-xl font-semibold'>Thông tin cơ bản</h2>
                <form action="" >
                    <div className='my-5 w-full'>
                        <label htmlFor="">Tiêu đề tuyển dụng <span className='text-red-500'>*</span> </label>
                        <br />
                        <input
                            type="text"
                            className='border  w-full py-2 rounded-md outline-blue-400 px-3 mt-3'
                            placeholder='Vd Senior ReactJs'
                        />
                    </div>
                    <div>
                        <Select
                            mode="multiple"
                            style={{ width: '100%', height: "40px" }}
                            placeholder="select one country"
                            defaultValue={['china']}
                            onChange={handleChange}
                            optionLabelProp="label"
                            className=''
                        >
                            <Option value="IT-Phần mềm" label="IT-Phần mềm">
                                <Space>
                                    <span role="img" aria-label="IT-Phần mềm">
                                        IT-
                                    </span>
                                    Phầm mềm
                                </Space>
                            </Option>
                            <Option value="usa" label="USA">
                                <Space>
                                    <span role="img" aria-label="USA">
                                        🇺🇸
                                    </span>
                                    USA (美国)
                                </Space>
                            </Option>
                            <Option value="japan" label="Japan">
                                <Space>
                                    <span role="img" aria-label="Japan">
                                        🇯🇵
                                    </span>
                                    Japan (日本)
                                </Space>
                            </Option>
                            <Option value="korea" label="Korea">
                                <Space>
                                    <span role="img" aria-label="Korea">
                                        🇰🇷
                                    </span>
                                    Korea (韩国)
                                </Space>
                            </Option>
                        </Select>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default JobCreate