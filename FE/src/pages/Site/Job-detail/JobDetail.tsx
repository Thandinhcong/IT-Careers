import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineContainer, AiOutlineHdd, AiOutlineHeart } from "react-icons/ai"
import SearchJobs from "../Recruit/SearchJobs"
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import TabNew from "./TabNew";
import TabInfor from "./TabInfor";

const JobDetail = () => {
    const [basicActive, setBasicActive] = useState("tab1");

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };
    return (
        <div>
            <div className="max-w-screen-xl mx-auto"><SearchJobs /></div>
            <div className="bg-gray-50 py-6">
                <div className="max-w-screen-lg mx-auto bg-white p-4">
                    <div className="grid grid-cols-4 my-2">
                        <div className="col-span-3">
                            <p className="font-bold text-2xl">Tuyển Lái Xe Tải(nhận bổ túc) Và Phụ Xe Giao Bánh Kẹo tại BẮC GIANG</p>
                            <p className="uppercase my-3">Công ty tnhh vận tải miền bắc</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="text-white border border-blue-600 bg-blue-600 py-3 hover:bg-blue-500 font-medium rounded-lg">
                                <AiOutlineCheck className="inline-block text mr-2 text-xl" />Nộp hồ sơ online
                            </button>
                            <button className="bg-white border-2 border-blue-600 text-blue-600 py-3 hover:text-white hover:bg-blue-600 font-medium rounded-lg">
                                <AiOutlineHeart className="inline-block text mr-2 text-xl" /> Lưu tin
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <TETabs className="border-b">
                            <TETabsItem
                                onClick={() => handleBasicClick("tab1")}
                                active={basicActive === "tab1"}
                            >
                                <AiOutlineContainer className="inline-block mr-1" /> Tin tuyển dụng
                            </TETabsItem>
                            <TETabsItem
                                onClick={() => handleBasicClick("tab2")}
                                active={basicActive === "tab2"}
                            >
                                <AiOutlineHdd className="inline-block mr-1" /> Thông tin công ty
                            </TETabsItem>
                        </TETabs>

                        <TETabsContent className="mt-4">
                            <TETabsPane show={basicActive === "tab1"}><TabNew /></TETabsPane>
                            <TETabsPane show={basicActive === "tab2"}><TabInfor /></TETabsPane>
                        </TETabsContent>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetail