import { LockOutlined, UserOutlined, PhoneOutlined, EnvironmentOutlined, DatabaseOutlined, LinkOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { AuthSignup, useSignupCompaniesMutation } from '../../../api/auth/Companies';
import { Link, useNavigate } from 'react-router-dom';

const SignUpCompanies = () => {
    const [signup] = useSignupCompaniesMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values: AuthSignup) => {
        signup(values)
            .unwrap()
            .then((response) => {
                if (response.status === 'fails') {
                    if (response.errors.email) {
                        message.info("Email đã tồn tại vui lòng sử dụng email khác");
                    } else if (response.errors.phone) {
                        message.info("Số điện thoại đã tồn tại vui lòng sử dụng số khác");
                    }
                } else {
                    message.success("Đăng kí thành công");
                    navigate("/companies/signin")
                }
            })
            .catch((error) => {
                if (error.errors === "email") {
                    message.error("Email đã tồn tại vui lòng sử dụng email khác");
                } else if (error.error === "phone") {
                    message.error("Số điện thoại đã tồn tại vui lòng sử dụng số khác");
                }
            });
    };
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside
                    className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-4"
                >
                    <img
                        alt="Pattern"
                        src="https://thuthuatnhanh.com/wp-content/uploads/2021/06/Hinh-anh-lam-viec-nhom-hieu-qua-nhat.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-8">
                    <div className="max-w-2xl">
                        <a className="block text-blue-600" href="/">
                            <span className="sr-only">Home</span>
                            <img src="https://123job.vn/images/logo_tim.png" className="w-36 mb-10" alt="" />
                        </a>
                        <h1 className="mt-6 text-xl font-bold text-blue-500 sm:text-3xl md:text-4xl">Chào mừng bạn đến với BEWORK!!</h1>
                        <p className="mt-4 leading-relaxed text-gray-800">
                            Đăng ký tài khoản nhà tuyển dụng để tìm được những ững viên phù hợp nhất với công ty của bạn
                        </p>
                        <Form
                            form={form}
                            name="normal_login"
                            className="login-form"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <h2 className="text-lg font-bold my-4 border-l-4 border-blue-500 pl-1">Tài khoản</h2>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được bỏ trống!' }]}
                            >
                                <Input prefix={<MailOutlined className="site-form-item-icon p-3 text-blue-500" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    { required: true, message: 'Mật khẩu không được bỏ trống!' },
                                    { min: 6, message: 'Mật khẩu phải tối thiểu 6 ký tự!' }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className=" site-form-item-icon p-3 text-blue-500" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="password_confirmation"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true, message: "Không được bỏ trống!!"
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input prefix={<LockOutlined className="site-form-item-icon p-3 text-blue-500" />}
                                    type="password"
                                    placeholder="Nhập lại mật khẩu" />
                            </Form.Item>
                            <h2 className="text-lg font-bold my-4 border-l-4 border-blue-500 pl-1">Thông tin nhà tuyển dụng</h2>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Họ và tên"
                                        name="name"
                                        rules={[
                                            { required: true, message: 'Trường này không được bỏ trống !' },
                                        ]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon p-2.5 text-blue-500" />} placeholder="Họ tên cá nhân" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"
                                        rules={[
                                            { required: true, message: 'Trường này không được bỏ trống !' },
                                            { pattern: /^(0[0-9]{9,10})$/, message: "Số điện thoại không đúng định dạng" }
                                        ]}
                                    >
                                        <Input prefix={<PhoneOutlined className="site-form-item-icon p-2.5 text-blue-500" />} placeholder="Số điện thoại cá nhân" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Tên công ty"
                                        name="company_name"
                                        rules={[
                                            { required: true, message: 'Trường này không được bỏ trống !' },
                                        ]}
                                    >
                                        <Input prefix={<DatabaseOutlined className="site-form-item-icon p-2.5 text-blue-500" />} placeholder="Tên công ty" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Link trang web"
                                        name="link_web"
                                        rules={[
                                            { required: true, message: 'Trường này không được bỏ trống !' },
                                        ]}
                                    >
                                        <Input prefix={<LinkOutlined className="site-form-item-icon p-2.5 text-blue-500" />} placeholder="Link trang web" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Địa chỉ"
                                        name="address"
                                        rules={[
                                            { required: true, message: 'Trường này không được bỏ trống !' },
                                        ]}
                                    >
                                        <Input prefix={<EnvironmentOutlined className="site-form-item-icon p-2.5 text-blue-500" />} placeholder="Địa chỉ công ty" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item className='text-center'>
                                <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" style={{ height: '45px' }}>
                                    Đăng kí
                                </Button>
                                <p className='my-2'>Hoặc</p>
                                <p>Đã có tài khoản? <Link to="/business/signin" className='text-blue-500 hover:text-blue-800 hover:underline'>Đăng nhập ngay</Link></p>

                            </Form.Item>
                        </Form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default SignUpCompanies