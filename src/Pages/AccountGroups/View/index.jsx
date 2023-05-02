import React, { useState, useEffect } from 'react'
import './style.scss';
import { Col, Typography, Input, Row, Form, Space, Descriptions, Layout } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import API from '../../../API'
import { useForm } from 'antd/es/form/Form';
import { Description } from '../../../Components';
import { Languages } from '../../../Config';
const innerText = Languages.SelectLanguage("AccountGroups")
const { Text } = Typography;

function Index() {
   const navigate = useNavigate()
   const { uuid } = useParams()
   const [data, setData] = useState({})
   const showData = () => {
      API.Finance.KontoGroups.show(uuid).then(res => {
         setData(res.data.data)
      })
   }
   useEffect(() => { showData() }, [])
   return (
      <Layout className='c-wrapper'>
         <Descriptions title="Hesab qrupları məlumat səhifəsi" column={4}>
            <Descriptions.Item label={innerText.name_eng}>{data?.name_eng}</Descriptions.Item>
            <Descriptions.Item label={innerText.name_az}>{(data?.name_az || data?.name_az === 0) || 'Boşdur'}</Descriptions.Item>
            <Descriptions.Item label={innerText.abbreviation_eng}>{data?.abb_eng}</Descriptions.Item>
            <Descriptions.Item label={innerText.abbreviation_az}>{data?.abb_az}</Descriptions.Item>
         </Descriptions>

      </Layout>
      //   <Row justify='space-around'>
      //       <Col>
      //           <Description title={innerText.name_eng} children={data?.name_eng} />
      //       </Col>
      //       <Col>
      //           <Description title={innerText.name_az} children={data?.name_az} />
      //       </Col>
      //       <Col>
      //           <Description title={innerText.abbreviation_eng} children={data?.abb_eng} />
      //       </Col>
      //       <Col>
      //           <Description title={innerText.abbreviation_az} children={data?.abb_az} />
      //       </Col>
      //   </Row>
   )
}
export default Index