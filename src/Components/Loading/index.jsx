import React, { Component, memo } from 'react'
import "./styles.scss";
import { SettingOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";

const Index = (props) => {
    const { style, icon, message, hidden } = props;
    return (
        // !hidden && 
        <Space style={{ ...style }} className="comp-Loading" size="middle">
            <Spin indicator={icon || <SettingOutlined spin />} />
            <Spin indicator={icon || <SettingOutlined spin />} size="large" tip={message || "Loading..."} />
            <Spin indicator={icon || <SettingOutlined spin />} />
        </Space>
    )
}

export default Index;