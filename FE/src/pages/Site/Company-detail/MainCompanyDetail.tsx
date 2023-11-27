import { useEffect, useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import TabsOverview from "./TabsOverview";


const MainCompanyDetail = () => {
    const [basicActive, setBasicActive] = useState("tab1");

    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };

    const handleTabChange = (value: string) => {
        setBasicActive(value);
    };

    const tabs = [
        { tabName: 'Tổng quan 1', active: 'tab1', component: <TabsOverview onTabChange={handleTabChange} /> },
    ];
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
