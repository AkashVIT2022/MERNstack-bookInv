import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

const DealerShipmentsComponent = () => {
  const [dealerData, setDealerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/deals'); // Replace with your API endpoint
        const data = response.data;
        console.log(data);

        // Calculate total value of orders for each dealer
        const dealerOrders = {};
        data.forEach((shipment) => {
          const { dealer_name, books ,stat} = shipment;

          if(stat=='accepted'){
            let totalValue = 0;
          books.forEach((book) => {
            totalValue += book.quantity;
          });

          if (dealer_name in dealerOrders) {
            dealerOrders[dealer_name] += totalValue;
          } else {
            dealerOrders[dealer_name] = totalValue;
          }
          }
        });

        // Convert dealer orders object to an array
        const dealerOrdersArray = Object.entries(dealerOrders).map(([dealer, totalValue]) => ({
          dealer,
          totalValue,
        }));

        setDealerData(dealerOrdersArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create the chart once dealerData is available
    if (dealerData.length > 0) {
      const chart = echarts.init(document.getElementById('chart-container'));

      // Prepare data for the chart
      const xAxisData = dealerData.map((dealer) => dealer.dealer);
      const yAxisData = dealerData.map((dealer) => dealer.totalValue);

      // Define the chart options
      const options = {
        title: {
          text: 'Dealer Shipments',
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
  }, [dealerData]);

  return <div id="chart-container" style={{ width: '100%', height: '600px' }}></div>;
};

export default DealerShipmentsComponent;
