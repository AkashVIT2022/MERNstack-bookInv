import React from 'react';
import { useEffect,useState } from "react";

import PubButton from './PubButton';
const Inventory = () => {
    
    const [stocks,setStocks] = useState(null);
    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch("http://localhost:3001/api/stocks")
            const json = await response.json()
            console.log(json);
            if(response.ok){
                //modifying the json file
                const transformedData = [];

                json.forEach((item) => {
                const existingItem = transformedData.find(
                    (obj) => obj.publisherName === item.publisher_name
                );

                const stock = {
                    name: item.name,
                    quantity: item.quantity,
                    publisher_id: item.publisher_id,
                    author: item.author,
                    year: item.year,
                    price: item.price
                };

                if (existingItem) {
                    existingItem.stocks.push(stock);
                } else {
                    transformedData.push({
                    publisherName: item.publisher_name,
                    publisher_id: item.publisher_id,
                    stocks: [stock]
                    });
                }
                });
                
                setStocks(transformedData)
            }
        }

        fetchStocks()
    },[])
    
    const view = (json) => {
        alert("json.publisherName");
    }

    return (
        <div className="home">
            {stocks && stocks.map(stock => (
                <div className='pub'>
                    <PubButton stock={stock} />
                </div>
        ))}
        </div>
    )

    
    
}

export default Inventory;