import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useState } from 'react';

const App = ({ setEtaxesData }) => {
    const [fileList, setFileList] = useState([]);

    const props = {
        name: 'doc',
        action: 'http://dev.backrp.erp-intel.com/api/v1/fn/bill/doc',
        headers: {
            Authorization: 'Bearer 2778|rG49Vuf4LW4l3MEOhsHs1flqcVbJh6iaVPtKuqbL',
        },
        onSuccess(response) {
            setEtaxesData(response.data);
            message.success(`Data yükləndi...`);
            setFileList([]);
        },
        onError() {
            message.error(`Data yüklənmədi...`);
        },
        fileList,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Faylı yüklə</Button>
        </Upload>
    );
};

export default App;