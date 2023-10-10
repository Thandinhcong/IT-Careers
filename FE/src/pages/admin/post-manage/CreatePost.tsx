import { Link } from 'react-router-dom'
import { ArrowLeftOutlined } from "@ant-design/icons"
const CreatePost = () => {
    return (
        <div>
            <Link to="/admin/post-manage"> <ArrowLeftOutlined className='mr-1' />Quay lại</Link>

        </div>

    )
}

export default CreatePost