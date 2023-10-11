import { useGetMajorQuery } from "../../../api/majorApi"

const DashBoard = () => {
    const { data } = useGetMajorQuery();
    console.log(data);

    return (
        <div>index</div>
    )
}

export default DashBoard