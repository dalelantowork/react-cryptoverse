import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import '../App.css';

const { Title } = Typography;


const LineChart = ({coinHistory, currentPrice, coinName}) => {
    const [newWidth, setNewWidth] = useState(2);
    const [newRadius, setNewRadius] = useState(3);
    const [screenSize, setScreenSize] = useState(null);
    //console.log(coinHistory);
    // const coinPrice = [
    //     37982.28034311263,
    //     37982.28034311263,
    // ]
    
    const coinPrice = [];
    const coinTimestamp = [];
    const revCoinPrice = [];
    const revCoinTimestamp = [];

    //console.log(coinHistory?.data?.history?.length);

    useEffect(()=> {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize',handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      useEffect(() => {
        if(screenSize <= 768 ){
          setNewWidth(1);
          setNewRadius(1);
        } else {
          setNewWidth(2);
          setNewRadius(3);
        }
      },[screenSize]);

    for(let i = 0; i < coinHistory?.data?.history?.length; i += 1){
        //console.log(moment.unix(coinHistory.data.history[0].timestamp).format("MM/DD/YYYY"));
        //console.log(coinHistory.data.history[0].price)
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(moment.unix(coinHistory.data.history[i].timestamp).format("MM/DD/YYYY"));
    }

    coinPrice.reverse().map((cprice, i) => {
        revCoinPrice.push(cprice);
    })

    coinTimestamp.reverse().map((cstamp, i) => {
        revCoinTimestamp.push(cstamp);
    })
    
    //console.log(coinPrice);
    
    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: revCoinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                borderWidth: newWidth,
                pointRadius: newRadius,
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    }
                }
            ]
        }
    }

    //console.log(data);
    
    return (
        <>
        <Row className="chart-header">
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className="price-container">
                <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
                <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
            </Col>
        </Row>
        {/* <div style={`height:'${lineHeight}',width:'100%'`}> */}
        <Row gutter={[16, 16]}>
            <Col xs={24} className='lineChart-Height'>
                <Line data={data} options={options}/>
            </Col>
        </Row>
        
        </>
    )
}

export default LineChart
