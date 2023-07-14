import React, { useContext } from 'react';
import { useEffect,useState } from "react";
import { AuthContext } from './context/AuthContext';

const Home = () => {
    const {data}=useContext(AuthContext);
    const [stocks,setStocks] = useState(null);
    useEffect(() => {
        const fetchStocks = async () => {
            //set id here
            var id=data.id
            var path= "http://localhost:3001/api/publisher/".concat(id);
            const response = await fetch(path)
            const json = await response.json()
            console.log(json)
            if(response.ok){
                setStocks(json)
            }
        }

        fetchStocks()
    },[])

    return (
        <div className="home">
            <center><h1>Inventory</h1></center>
            {stocks && stocks.map(stock => (
                <div className='publish'>
                    <p className='publishtext'>Name:{stock.name}&emsp;&emsp;&emsp;&emsp;Quantity:{stock.quantity}&emsp;&emsp;&emsp;&emsp;</p>
                </div>
        ))}
        </div>
    )

    
    
}

export default Home;