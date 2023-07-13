import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';
import { AuthContext } from './context/AuthContext';

const PublisherInventoryChart = ({ publisherId }) => {
  const [inventoryData, setInventoryData] = useState([]);
  const {data}=useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pubs'); // Replace with your API endpoint
        const data1 = response.data;
        // console.log(data);

        // Filter the inventory data based on the publisherId
        const filteredData = data1.filter((item) => item.pub_name === data.id);
        setInventoryData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log(inventoryData);
    if (inventoryData.length > 0) {
      const chart = echarts.init(document.getElementById('chart-container'));
      const chartData = inventoryData.flatMap((item) =>
  item.books.map((val) => ({
    name: val.name,
    value: val.quantity,
  }))
);
      
      console.log(chartData);
      const options = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: 'Quantity',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: true,
            },
            data: chartData,
          },
        ],
      };

      chart.setOption(options);
    }
  }, [inventoryData]);

  return <>
  <center className='dark'>Publisher shipment summary</center>
  <div id="chart-container" style={{ width: '100%', height: '600px' }}></div>
  </>;
};

export default PublisherInventoryChart;
