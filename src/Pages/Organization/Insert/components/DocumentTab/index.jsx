import { Col, Form, Row, Select, Input, DatePicker, Button, Space, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, MinusOutlined, LoadingOutlined } from "@ant-design/icons";
import API from "../../../../../API";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Index = ({ bankTime }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Yüklə
      </div>
    </div>
  );

  const [delivers, setDelivers] = useState([{}]);
  const [condinations, setCondinations] = useState([]);
  const getCondinations = () => {
    API.Procurement.Picklist.deliveryCondination().then((res) => {
      setCondinations(res.data.data);
    });
  };
  useEffect(() => {
    getCondinations();
  }, []);
  return (
    <>
      {delivers?.map(
        (delive, index) =>
          delive && (
            <Row>
              <Col span={24}>
                <Row gutter={14} style={{ display: "flex", justifyContent: "center" }}>
                  <Col span={14} style={{ display: "flex", justifyContent: "center" }}>
                    <Form.Item style={{ display: "flex", justifyContent: "center" }} className="c-form-item" name={["contract_delivery", index, "delivery_condition_id"]} rules={[{ required: false, message: "Zəhmət olmasa daxil edin" }]}>
                      <Upload name="avatar" listType="picture-card" className="avatar-uploader" showUploadList={false} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" beforeUpload={beforeUpload} onChange={handleChange}>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                              width: "100%",
                            }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>

                  {/* <Col
                    span={5}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: 15,
                    }}
                  >
                    <Button
                      danger
                      icon={<MinusOutlined />}
                      onClick={() => {
                        delete delivers[index];
                        setDelivers([...delivers]);
                      }}
                    />
                  </Col> */}
                </Row>
              </Col>
            </Row>
          )
      )}
      {/* <Row gutter={14}>
        <Col span={24} align="middle">
          <Button icon={<PlusOutlined />} onClick={() => setDelivers((prev) => [...prev, {}])} />
        </Col>
      </Row> */}
    </>
  );
};

export default Index;
