import React, { useContext } from 'react';
import { useEffect,useState } from "react";
import { AuthContext } from './context/AuthContext';

const Home = () => {
    
    const [stocks,setStocks] = useState(null);
    const {data}=useContext(AuthContext);
    useEffect(() => {
        const fetchStocks = async () => {
            //set id here
            var id=data.id;
            var path= "http://localhost:3001/api/dealer/".concat(id);
            const response = await fetch(path)
            const json = await response.json()

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
                <div className='deal'>
                    <p className='dealtext'>Name:&nbsp;&nbsp; {stock.name}&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;Quantity:&nbsp;&nbsp;{stock.quantity}&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;Author:&nbsp;&nbsp;{stock.author}</p>
                </div>
        ))}
        </div>
    )

    
    
}

export default Home;