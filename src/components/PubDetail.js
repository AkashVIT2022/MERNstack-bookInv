

const PubDetail = ({stock}) =>{

    return(
        <div className="pubdetail">
            <h3 className="pubid">ID : {stock.publisher_id}</h3>
            <h4>Stocks :</h4>
            {stock && stock.stocks.map((book) => (
                <p className="pubdetailtext"><b>Name:</b>{book.name}  &emsp;&emsp;&emsp;&emsp;<b>Quantity:</b> {book.quantity} &emsp;&emsp;&emsp;&emsp; <b>Author:</b>{book.author}&emsp;&emsp;&emsp;&emsp; <b>Price per piece:</b>{book.price}</p>
            ))}
        </div>
    )
}

export default PubDetail;