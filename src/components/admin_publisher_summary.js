import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const PublisherShipmentsComponent = () => {
  const [publisherData, setPublisherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/pubs'); // Replace with your API endpoint
        const data = response.data;
        console.log(data);
        // Calculate total value of orders for each publisher
        const publisherOrders = {};
        data.forEach((shipment) => {
          const { pub_name, books,stat } = shipment;
          if(stat=='accepted'){
            
          let totalValue = 0;
          books.forEach((book) => {
            totalValue += book.quantity * book.price;
          });

          if (pub_name in publisherOrders) {
            publisherOrders[pub_name] += totalValue;
          } else {
            publisherOrders[pub_name] = totalValue;
          }
          }
        });

        // Convert publisher orders object to an array
        const publisherOrdersArray = Object.entries(publisherOrders).map(([publisher, totalValue]) => ({
          publisher,
          totalValue,
        }));

        setPublisherData(publisherOrdersArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create the chart once publisherData is available
    if (publisherData.length > 0) {
      const chart = echarts.init(document.getElementById('chart-container'));

      // Prepare data for the chart
      const xAxisData = publisherData.map((publisher) => publisher.publisher);
      const yAxisData = publisherData.map((publisher) => publisher.totalValue);

      // Define the chart options
      const options = {
        title: {
          text: 'Publisher Shipments',
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: yAxisData,
          },
        ],
      };

      // Set the chart options and render the chart
      chart.setOption(options);
    }
  }, [publisherData]);

  return <div id="chart-container" style={{ width: '100%', height: '600px' }}></div>;
};

export default PublisherShipmentsComponent;
