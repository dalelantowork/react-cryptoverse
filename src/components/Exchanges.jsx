import React,{ useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Card, Table } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  //const [dataSource, setDataSource] = useState([]);
  console.log(exchangesList);
  if (isFetching) return <Loader />;
  
  const dataSource = [];

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      render: logo => <Avatar className="exchange-image" src={logo}/>,
      key: 'logo',
    },
    {
      title: 'Markets',
      dataIndex: 'markets',
      key: 'markets',
    },
    {
      title: '24h Trade Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
  ];
  
  for(let i = 0; i < exchangesList.length; i += 1){
      //console.log(moment.unix(coinHistory.data.history[0].timestamp).format("MM/DD/YYYY"));
      //console.log(coinHistory.data.history[0].price)
      //console.log(exchangesList[i].rank);
      dataSource.push({
        key: exchangesList[i].rank, 
        rank: exchangesList[i].rank,
        name: exchangesList[i].name,
        logo: exchangesList[i].iconUrl,
        markets: exchangesList[i].numberOfMarkets,
        volume: exchangesList[i]['24hVolume']
      });
  }
  
  //console.log(dataSource);

  return (
    <>

      <Table dataSource={dataSource} columns={columns} />;

      {/* <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Rank</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Row gutter={[32, 32]}  key={exchange.uuid}>
            
              <Col span={6}>
                <Text><strong>{exchange.rank}.</strong></Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text><strong>{exchange.name}</strong></Text>
              </Col>
              <Col span={6}>${millify(exchange['24hVolume'])}</Col>
              <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
              <Col span={6}>{millify(exchange.rank)}</Col>
           
            </Row>
          </Col>
        ))}
      </Row> */}
      
    </>
  );
};

export default Exchanges;