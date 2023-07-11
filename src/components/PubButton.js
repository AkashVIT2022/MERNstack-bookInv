import {useState} from 'react';

import PubDetail from './PubDetail';

const PubButton = ({stock}) =>{
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {

        setIsShown(current => !current);

    };

    return(
        <div>
            <div className="pubcontainer"onClick={handleClick}>
            <button className='pubtext' >{stock.publisherName}</button>
            </div>
            {isShown && <PubDetail stock={ stock }/>}
        </div>
        
        
    )
}

export default PubButton;