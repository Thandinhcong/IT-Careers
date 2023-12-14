import { Link } from "react-router-dom"
import { Button, Form, Input, Select } from 'antd';
import { useDataFastJobQuery, useFindJobFastMutation } from "../../../api/find-Job/find_jobApi";
import { Notyf } from "notyf";
import { useGetInfoUserQuery } from "../../../api/auths";

const FindJobFast = () => {
    const { data } = useDataFastJobQuery();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const listProvince = data?.data?.province;
    const listExp = data?.data?.experiences;
    const listWorkingForm = data?.data?.working_form;
    const listJobPost = data?.data.job_position;
    console.log(data);
    const { data: infoUser, isLoading: isLoadingInfo } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
    const [applyFast] = useFindJobFastMutation();
    const onFinish = async (values: any) => {
        try {
            await applyFast({
                candidate_id: idUser,
                ...values
            }).unwrap();
            notyf.success("Ứng tuyển nhanh thành công!")

        } catch (error: any) {
            notyf.error(error?.data?.message);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        notyf.error(errorInfo?.data?.message)

    };

    type FieldType = {
        search?: string
        working_form?: string;
        experiences?: string;
        province?: string;
    };

    return (
        <div className='max-w-6xl mx-auto my-10'>
            <h3 className='text-center text-2xl font-semibold mb-10 text-blue-500'>Tìm kiếm nhanh</h3>
            <p className="text-center text-base font-sans">Mỗi lần sử dụng bạn sẽ mất 30.000 coin. Tối đa bạn chỉ được sử dụng 1 lần / 1 ngày. Sử dụng chức năng sẽ giúp bạn apply vào bài tuyển dụng phù hợp một cách nhanh chống mà bạn không phải tìm xem từng bài tuyển dụng nào phù hợp với bạn.</p>
            <div className="text-center mt-1">Do bạn chưa tạo cv trên hệ thống. nên bạn hãy tìm kiếm bằng cách chọn chuyên ngành hoặc chọn kỹ năng bên dưới để sử dụng chức năng hoặc bạn có thể tạo cv <Link to="/user/listcv" className="text-blue-500">tại đây!</Link></div>
            {/* <div className="my-10 grid grid-cols-4 gap-5"> */}
            <Form
                // form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="grid grid-cols-5 gap-5 my-5">

                    <div className="col-span-1">
                        <Form.Item<FieldType>
                            label="Ngành nghề  quan tâm"
                            name="search"
                            rules={[{ required: true, message: 'Vui lòng nhập ngành nghề muốn tìm việc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Tỉnh/Thành phố"
                            name='province'
                            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }}>
                                {listProvince?.map((options: any) => (
                                    <Select.Option key={options.id} value={options?.id}  >
                                        {options.province}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">

                        <Form.Item<any>
                            label="Kinh nghiệm làm việc"
                            name="experiences"
                            rules={[{ required: true, message: "Vui lòng chọn địa chỉ làm việc" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {listExp?.map((options: any) => (
                                    <Select.Option key={options.id} value={options?.id} >
                                        {options.experience}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Hình thức làm việc"
                            name="working_form"
                            rules={[{ required: true, message: "Vui lòng chọn hình thức làm việc" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {
                                    listWorkingForm?.map((options: any) => {
                                        return <Select.Option key={options.id} value={options.id}>
                                            {options?.working_form}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Chức vụ"
                            name="job_position"
                            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {
                                    listJobPost?.map((options: any) => {
                                        return <Select.Option key={options.id} value={options.id}>
                                            {options?.job_position}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                    <Button type="primary" className='bg-blue-500 mb-10 mx-auto' htmlType="submit">
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
        </div>

        // </div>
    )
}

export default FindJobFast