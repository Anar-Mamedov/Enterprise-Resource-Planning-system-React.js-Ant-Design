import { Spin } from 'antd';
import './style.scss'
const Index = ({ loading }) => {
    return (
        <>
            {loading
                &&
                <span className='parent'>
                    <Spin size="large" className='loader' />
                </span>
            }
        </>
    )
};
export default Index;