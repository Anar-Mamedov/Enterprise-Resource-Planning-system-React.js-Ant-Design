import React, { useEffect, useState } from 'react'
import { Col, Typography, Layout, Row } from 'antd';
import { useParams } from 'react-router';
import { Description } from '../../../Components'
import API from '../../../API'
import { Languages } from "../../../Config";
const {Title } = Typography;
const innerText = Languages.SelectLanguage("BankGroups");

function Index() {
   const { uuid } = useParams()
   const [data, setData] = useState([])

   const showData = () => {
      API.Finance.BankGeneral.show(uuid).then(res => {
         console.log(res.data.data)
         setData(res.data.data)
      })
   }
   useEffect(() => { showData() }, [])

   const base = data?.base;
   const branch = data?.branch
   return (
      <Layout>
         <Row style={{ flexDirection: 'column' }}>
            <Col style={{ margin: '1rem 0' }}>
               <Title style={{ color: '#1e81b0', marginLeft: "10px" }} level={5}>{innerText.mainInfo}</Title>
            </Col>
            <Col>
               <Col style={{ marginBottom: '1rem' }}>
                  <Description title={innerText.bankName} children={base?.name} />
                  <Description title={innerText.swift} children={base?.swift} />
                  <Description title={innerText.voen} children={base?.voen} />
               </Col>
               {base?.corr?.map((corr, i) => (
                  <Col key={i}>
                     <Description title={innerText.bankAccount} children={corr.name} />
                     <Description title={innerText.currency} children={corr.currency?.name} />
                  </Col>
               ))}
            </Col>
         </Row>
         <Row style={{ display: 'flex', flexDirection: 'column' }}>
            <Col style={{ margin: '1rem 0' }}>
               <Title style={{ color: '#1e81b0', marginLeft: "10px" }} level={5}>{innerText.bankBranchs}</Title>
            </Col>
            {branch?.map((item, i) => (
               <Col key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid lightgray', padding: '0 0 20px 0' }}>
                  <Description title={innerText.branchName} children={item.branch?.name} />
                  <Description title={innerText.branchCode} children={item.branch?.code} />
                  <Description title={innerText.city} children={item.branch?.address?.city?.name_nat} />
                  <Description title={innerText.addressNative} children={item.branch?.address?.name_nat} />
                  <Description title={innerText.addressEng} children={item.branch?.address?.name_eng} />
               </Col>
            ))}
         </Row>
      </Layout >
   )
}

export default Index