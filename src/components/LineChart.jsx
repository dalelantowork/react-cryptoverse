import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd';
import moment from 'moment';

const { Title } = Typography;


const LineChart = ({coinHistory, currentPrice, coinName}) => {
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
            }
        ]
    }

    const options = {
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
        <Line data={data} options={options}/>
        </>
    )
}

export default LineChart
