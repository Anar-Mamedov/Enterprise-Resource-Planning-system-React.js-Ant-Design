import { memo, useEffect, useRef, useState } from 'react'
import API from "../../API"
import { Button, Space } from "antd"
import { WarningOutlined, StepBackwardOutlined, CheckOutlined } from "@ant-design/icons"

const Index = ({ value, trn_data, trn_list, callback, form }) => {
    const nextDisable = useRef(false)
    const backDisable = useRef(false)
    const rejectDisable = useRef(false)

    useEffect(() => {
        nextDisable.current = false
        backDisable.current = false
        rejectDisable.current = false
    })
    const setFormError = (name, messages) => {
        name = name.splitMap('.');
        form.setFields([{ name, errors: [...messages] }]);
    }

    const renderButtonGroup = () => {
        const onClickNext = (trn_data) => {
            if (!nextDisable.current) {
                nextDisable.current = true
                trn_data && API.Signature.Signature.store(trn_data).then(res => {
                    switch (res.status) {
                        case 201: {
                            callback && callback()
                            break;
                        }
                        case 400: {
                            const { data } = res.data;
                            for (let key in data) {
                                setFormError(key, data[key]);
                            }
                            break;
                        }
                    }
                    nextDisable.current = true
                })
            }
        }

        const onRejectClick = (trn_list) => {
            if (!rejectDisable.current) {
                rejectDisable.current = true
                trn_list && API.Signature.Signature.reject(trn_list).then(_ => {
                    callback && callback()
                })
            }
        }

        const onReturnClick = (trn_list) => {
            if (!backDisable.current) {
                backDisable.current = true
                API.Signature.Signature.return(trn_list).then(_ => {
                    callback && callback()
                })
            }
        }

        switch (value.key) {
            case 'reject_method':
                return (
                    <Button
                        disabled={rejectDisable.current}
                        icon={<WarningOutlined />}
                        onClick={_ => onRejectClick(trn_list)}
                        className='c-btn c-btn--danger'
                    >
                        Reject
                    </Button>
                )
            case 'return_method':
                return (
                    <Button
                        disabled={backDisable.current}
                        icon={<StepBackwardOutlined />}
                        onClick={_ => onReturnClick(trn_list)}
                        className='c-btn c-btn--warning'
                    >
                        Back
                    </Button >
                )
            case 'next_method':
                return (
                    <Button
                        disabled={nextDisable.current}
                        icon={<CheckOutlined />}
                        onClick={_ => onClickNext(trn_data)}
                        className='c-btn c-btn--primary'
                    >
                        {value?.content?.button_name_nat}
                    </Button >
                )
            default:
                break;
        }
    }
    return (
        <Space>
            {renderButtonGroup()}
        </Space>
    )
}
export default memo(Index)