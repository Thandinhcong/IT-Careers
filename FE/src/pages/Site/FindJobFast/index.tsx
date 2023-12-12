import { Link } from "react-router-dom"
import type { SelectProps } from 'antd';
import { Button, Select, Space } from 'antd';

const FindJobFast = () => {
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    const options: SelectProps['options'] = [
        {
            label: 'Việt Nam',
            value: 'china',
            emoji: '🇨🇳',
            desc: 'Việt Nam',
        },
        {
            label: 'USA',
            value: 'usa',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
        },
        {
            label: 'Japan',
            value: 'japan',
            emoji: '🇯🇵',
            desc: 'Japan (日本)',
        },
        {
            label: 'Korea',
            value: 'korea',
            emoji: '🇰🇷',
            desc: 'Korea (韩国)',
        },
    ];
    return (
        <div className='max-w-3xl mx-auto my-10'>
            <h3 className='text-center text-2xl font-semibold mb-10 text-blue-500'>Tìm kiếm nhanh</h3>
            <p className="text-center text-base font-sans">Mỗi lần sử dụng bạn sẽ mất 30.000 coin. Tối đa bạn chỉ được sử dụng 1 lần / 1 ngày. Sử dụng chức năng sẽ giúp bạn apply vào bài tuyển dụng phù hợp một cách nhanh chống mà bạn không phải tìm xem từng bài tuyển dụng nào phù hợp với bạn.</p>
            <div className="text-center mt-1">Do bạn chưa tạo cv trên hệ thống. nên bạn hãy tìm kiếm bằng cách chọn chuyên ngành hoặc chọn kỹ năng bên dưới để sử dụng chức năng hoặc bạn có thể tạo cv <Link to="/user/listcv" className="text-blue-500">tại đây!</Link></div>
            <div className="my-10 grid grid-cols-3 gap-5">
                <Select
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={[
                        { value: 'D', label: 'Front end developer' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                />
                <Select
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    placeholder="Loại hình "
                    options={[
                        { value: 'D', label: 'Front end developer' },
                        { value: 'lucy', label: 'Thực tập' },
                        { value: 'Yiminghe', label: 'Bán thời gian' },
                        { value: 'disabled', label: 'Toàn thời gian', disabled: true },
                        { value: 'disabled', label: 'Remote', disabled: true },

                    ]}
                />
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Chọn kỹ năng..."
                    defaultValue={['china']}
                    onChange={handleChange}
                    optionLabelProp="label"
                    options={options}
                    optionRender={(option: any) => (
                        <Space>
                            <span role="img" aria-label={option.data.label}>
                                {option.data.emoji}
                            </span>
                            {option.data.desc}
                        </Space>
                    )}
                />
            </div>
            <div className="flex justify-center">
                <Button className="bg-blue-500 text-white ">Tìm kiếm</Button>
            </div>
        </div>
    )
}

export default FindJobFast