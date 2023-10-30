import SearchJobs from "../Recruit/SearchJobs"
import { useState } from "react";
import { AiOutlineClockCircle, AiOutlineCreditCard, AiOutlineEnvironment, AiOutlineHeart, AiOutlineMoneyCollect, AiOutlineUser, AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";

const TabAffair = () => {
    const posts = [
        {
            id: "tab1",
            title: "Thực tập sinh React1",
            location: "Tây Hồ Hà Nội",
            salary: "8-15 triệu/tháng",
            timeAgo: "4 tuần trước",
            isFollowing: false,
        },
        {
            id: "tab2",
            title: "Thực tập sinh React2",
            location: "Tây Hồ Hà Nội",
            salary: "8-15 triệu/tháng",
            timeAgo: "4 tuần trước",
            isFollowing: false,
        },
        {
            id: "tab3",
            title: "Thực tập sinh React3",
            location: "Tây Hồ Hà Nội",
            salary: "8-15 triệu/tháng",
            timeAgo: "4 tuần trước",
            isFollowing: false,
        },
        {
            id: "tab4",
            title: "Thực tập sinh React3",
            location: "Tây Hồ Hà Nội",
            salary: "8-15 triệu/tháng",
            timeAgo: "4 tuần trước",
            isFollowing: false,
        },
        {
            id: "tab5",
            title: "Thực tập sinh React3",
            location: "Tây Hồ Hà Nội",
            salary: "8-15 triệu/tháng",
            timeAgo: "4 tuần trước",
            isFollowing: false,
        },

    ];
    const [isFollowing, setIsFollowing] = useState<Record<string, boolean>>({});

    const toggleFollow = (postId: string) => {
        setIsFollowing((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const [verticalActive, setVerticalActive] = useState("tab1");

    const handleVerticalClick = (value: string) => {
        if (value === verticalActive) {
            return;
        }
        setVerticalActive(value);
    };

    return (
        <div className="-mx-8">
            <div className="font-bold leading-10 -mb-10 text-gray-800">
                <p className="text-2xl">Việc làm Bệnh viện đa khoa quốc tế thu cúc</p>
                <p>Tìm kiếm</p>
            </div>
            <SearchJobs />
            <p className="font-bold">13 việc làm đang tuyển tại Bệnh viện đa khoa quốc tế thu cúc</p>
            <div className="flex items-start gap-8">
                <div className="max-h-[800px] overflow-y-auto w-7/12">
                    <TETabs vertical >
                        {posts.map((post) => (
                            <TETabsItem
                                key={post?.id}
                                onClick={() => handleVerticalClick(post?.id)}
                                active={verticalActive === post?.id}
                                style={{ paddingLeft: '0rem', paddingRight: '0rem' }}
                                className={`border-2 border-t-2 rounded-lg py-0   ${verticalActive === post.id ? "border-blue-700" : ""
                                    }`}
                            >
                                <div className="border border-gray-400 rounded-lg shadow-lg p-5 text-gray-700 text-base w-full">
                                    <div className="normal-case font-normal text-left leading-10">
                                        <p className="font-semibold text-lg">{post?.title}</p>
                                        <p>
                                            <AiOutlineEnvironment className="inline-block mr-1" />{" "}
                                            {post.location}
                                        </p>
                                        <p>
                                            <AiOutlineMoneyCollect className="inline-block mr-1" />{" "}
                                            {post.salary}
                                        </p>
                                        <p className=" flex justify-between items-center">
                                            <span>
                                                <AiOutlineClockCircle className="inline-block mr-2" />
                                                {post.timeAgo}
                                            </span>
                                            <button
                                                className="border text-xl p-1 border-gray-200 rounded-md hover:bg-slate-200"
                                                onClick={() => toggleFollow(post.id)}
                                            >

                                                {isFollowing[post.id] ? (
                                                    <AiTwotoneHeart className="text-red-300" />
                                                ) : (
                                                    <AiOutlineHeart className="text-gray-400" />
                                                )}
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </TETabsItem>
                        ))}
                    </TETabs>
                </div>


                <TETabsContent className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-800">
                    {posts.map((post) => (
                        <TETabsPane key={post.id} show={verticalActive === post.id}>
                            <div>
                                <div>
                                    <div className="flex items-center gap-4">
                                        <img className="w-14" src="https://cdn.123job.vn/123job/uploads/2023/02/07/2023_02_07______553331b3f5d57b00c71a7ac016b5be1a.png" alt="" />
                                        <div className="leading-10">
                                            <p className="font-semibold text-lg">{post.title}</p>
                                            <p>{post.location} - {post.timeAgo}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Link to='' className="bg-blue-600 rounded-lg my-auto p-2 text-white font-semibold">Ứng tuyển ngay</Link>
                                        <button className="border text-3xl p-1 border-gray-200 rounded-md hover:bg-slate-200" onClick={() => toggleFollow(post.id)}>
                                            {isFollowing[post.id] ? (
                                                <AiTwotoneHeart className="text-red-300" />
                                            ) : (
                                                <AiOutlineHeart className="text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="border-t-4 my-4 grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto">
                                    <div className="leading-7">
                                        <p className="font-semibold text-[17px]">Thông tin cơ bản</p>
                                        <p><AiOutlineClockCircle className="inline-block mr-2" />Hạn nộp hồ sơ: 30-10-2023</p>
                                        <p><AiOutlineCreditCard className="inline-block mr-2" />Hình thức: Nhân viên toàn thời gian</p>
                                        <p><AiOutlineMoneyCollect className="inline-block mr-2" />Mức lương: 10 - 20 triệu/tháng</p>
                                        <p><AiOutlineUser className="inline-block mr-2" />Chức vụ: Nhân viên</p>
                                    </div>
                                    <div className="leading-7">
                                        <p className="font-semibold text-[17px]">Mô tả công việc</p>
                                        <p>- Thực hiện việc ký, theo dõi, nghiệm thu, đánh giá hiệu quả các hợp đồng hợp tác, trao đổi.
                                            - Cập nhật, báo cáo công việc và chịu trách nhiệm vê công việc mình phụ trách trước quản lý trực tiếp và Giám đốc Marketing.
                                            - Tạo mối quan hệ với các đối tác, công ty, doanh nghiệp, khách hàng; đề xuất các chương trình hợp tác trao đổi dịch vụ và trao đổi ưu đãi dịch vụ với đối tác nhằm thu hút khách hàng cho Bệnh viện.
                                            - Xây dựng, tổ chức thực hiện, lập kế hoạch, đề xuất các chương trình Marketing offline (tổ chức sự kiện, tổ chức các buổi giới thiệu sản phẩm dịch vụ của Bệnh viện tại các Công ty, Biển bảng, chạy roadshow,…) theo kế hoạch và sự chỉ đạo của cấp trên.
                                            - Tìm kiếm, tiếp cận khách hàng trực tiếp hoặc gián tiếp thông qua các kênh Đại lý, giới thiệu, Cộng tác viên, khách hàng lẻ, hợp tác trao đổi.</p>
                                    </div>
                                    <div className="leading-7">
                                        <p className="font-semibold text-[17px]">Yêu cầu</p>
                                        <p>- Có ít nhất 2 năm kinh nghiệm tại vị trí ứng tuyển.
                                            - Có kiến thức và hiểu biết về Sale, Marketing.
                                            - Kỹ năng giao tiếp tốt.
                                            - Khả năng làm việc nhóm, làm việc độc lập tốt.
                                            - Khả năng chịu áp lực công việc cao.
                                            - Sẵn sàng đi công tác xa nếu công việc yêu cầu.
                                            - Có tinh thần trách nhiệm.</p>
                                    </div>
                                    <div className="leading-7">
                                        <p className="font-semibold text-[17px]">Quyền lợi</p>
                                    </div>
                                </div>
                            </div>
                        </TETabsPane>
                    ))}
                </TETabsContent>
            </div>
        </div >
    )
}

export default TabAffair