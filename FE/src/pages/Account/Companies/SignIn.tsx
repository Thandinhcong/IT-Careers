import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { AuthSignin, useSigninCompaniesMutation } from '../../../api/auth/SigninCompanies';
import { useNavigate } from 'react-router-dom';


const SignInCompanies = () => {
    const [signin] = useSigninCompaniesMutation();
    const navigate = useNavigate();
    const onFinish = async (values: AuthSignin) => {
        signin(values)
            .unwrap()
            .then(() => {
                message.success("Đăng nhập thành công"),
                    navigate('/companys')

            })
            .catch((error) => {
                if (error.status === 401) {
                    message.error("Sai tài khoản hoặc mật khẩu")
                }
            })
    };
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside
                    className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-4"
                >
                    <img
                        alt="Pattern"
                        src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-8">
                    <div className="max-w-xl">
                        <a className="block text-blue-600" href="/">
                            <span className="sr-only">Home</span>
                            <img src="https://123job.vn/images/logo_tim.png" className="w-40 mb-20" alt="" />
                        </a>
                        <h1 className="mt-6 text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl">Chào mừng bạn quay trở lại!!</h1>
                        <p className="mt-4 leading-relaxed text-gray-800">
                            Cùng tạo dựng lợi thế cho doanh nghiệp bằng trải nghiệm công nghệ tuyển dụng ứng dụng sâu AI & Hiring Funnel
                        </p>

                        <Form
                            name="normal_login"
                            className="login-form"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được bỏ trống!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon p-3" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item

                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon p-3" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>
                            <Form.Item>
                                <a className="login-form-forgot float-right text-blue-500 hover:text-blue-800 hover:underline" href="#">
                                    Quên mật khẩu ??
                                </a>
                            </Form.Item>

                            <Form.Item className='text-center'>
                                <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" style={{ height: '45px' }}>
                                    Đăng nhập
                                </Button>
                                <p className='my-2'>Hoặc</p>
                                <p>Chưa có tài khoản? <a href="/companies/signup" className='text-blue-500 hover:text-blue-800 hover:underline'>Đăng ký ngay</a></p>

                            </Form.Item>
                        </Form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default SignInCompanies