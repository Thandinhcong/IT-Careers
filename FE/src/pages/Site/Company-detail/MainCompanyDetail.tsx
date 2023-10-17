import { useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import TabsOverview from "./TabsOverview";
import TabAffair from "./TabAffair";
import TabsFeedback from "./TabsFeedback";
import React from "react";

const MainCompanyDetail = () => {
    const [basicActive, setBasicActive] = useState("tab1");

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    const handleTabChange = (value: string) => {
        // Hàm này sẽ được gọi khi bạn bấm vào nút "Xem chi tiết" ở TabsOverview
        // để chuyển tab sang tab2 (TabAffair)
        setBasicActive(value);
    };

    const tabs = [
        { tabName: 'Tổng quan 1', active: 'tab1', component: <TabsOverview onTabChange={handleTabChange} /> },
        { tabName: 'Việc làm', active: 'tab2', component: <TabAffair /> },
        { tabName: 'Đánh giá', active: 'tab3', component: <TabsFeedback /> },
    ];

    return (
        <div className="px-8">
            <div className="my-4">
                <TETabs className="-mb-0">
                    {tabs.map((tab) => (
                        <TETabsItem
                            key={tab.active}
                            onClick={() => handleBasicClick(tab.active)}
                            active={basicActive === tab.active}
                        >
                            {tab.tabName}
                        </TETabsItem>
                    ))}
                </TETabs>
                <hr />
                <TETabsContent className="my-6">
                    {tabs.map((tab) => (
                        <TETabsPane key={tab.active} show={basicActive === tab.active}>
                            {tab.component}
                        </TETabsPane>
                    ))}
                </TETabsContent>
            </div>
        </div>
    );
};

export default MainCompanyDetail;