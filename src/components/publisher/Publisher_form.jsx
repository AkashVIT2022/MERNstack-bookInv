import React, { useState, useEffect } from "react";
import Axios from "axios"
const Publisher = () => {
  const [publisherID, setPublisherID] = useState("");
  const [bookName, setBookName] = useState("");
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");

  const [ETD, setETD] = useState("")

  const [item_I, setItem] = useState("");
  const [bookList, setBookList] = useState([]); // Array to store book information
  const [booksData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/pub_inv/api-get');
        if (response.status === 200) {
          // console.log(response.data);
          setData(response.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
        alert('Error: Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const Popup = (arg) => {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle(arg);
  }

  const onChangePublisherID = (event) => {
    setPublisherID(event.target.value);
  };

  const onChangeBookName = (event) => {
    setBookName(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value)); 
  };

  const onChangePrice = (event) => {
    setPrice(parseFloat(event.target.value));
  }

  const onChangeETD = (event) => {
    setETD(event.target.value);
  }

  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  }

  const onSearchBookName = (searchTerm, item) => {
    setBookName(searchTerm);
    setQuantity(item.quantity);
    setItem(item.quantity)
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1); // Increase quantity by 1
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrease quantity by 1, minimum 1
    }
  };

  const handleAdd = () => {

    if (publisherID !== "" && bookName !== "" && quantity !== "" && item_I >= quantity && price !== "" && ETD !== "" && address !== "") {
      Popup("disappear");
      const bookInfo = {
        name: bookName,
        quantity: quantity,
        price: price,
      };

      document.getElementById("quan").style.border = "none";
      document.getElementById("FORM").style.opacity = 1;
      

      setBookList([...bookList, bookInfo]); // Add book information to the bookList array
      setBookName("");
      setQuantity(1);
      setPrice(0);

      alert("Book added to the list");
    } else if (item_I < quantity) {
      Popup("show");
      document.getElementById("quan").style.border = "5px solid red";
      document.getElementById("FORM").style.opacity = 0.3;
      

    } else {

      alert("Enter all fields");

    }
    console.log(bookList)
  };

  const handleDelete = (index) => {
    const updatedBookList = [...bookList];
    updatedBookList.splice(index, 1);
    setBookList(updatedBookList);
  };

  const handleReset = () => {
    setBookList([]);
  }

  const handleOrderRequest = () => {

    console.log(bookList);
    console.log(publisherID)
    if (bookList.length > 0) {
      /*console.log(bookList)*/
      let dataSend = {
        "pub_id": publisherID, "books": bookList, "ETD": ETD, "address": address, "stat": "pending"
      }
      console.log(dataSend)
      fetch('http://localhost:3001/publish/publish-request', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Data sent to the database");

        })
        .catch((error) => console.error("Error: ", error));
    } else {
      alert("Book List is empty")
    }
  }

  return (
    <div className="text-center mx-auto">
      <h1 className="h1">PUBLISHER FORM</h1>
      <div class="popup">
        <span class="popuptext" id="myPopup">Quantity is higher</span>
      </div>
      <div className="container1" id="FORM">
        <table className="container2 table table-borderless" style={{ backgroundColor: "wheat" }}>
          <tbody>
            <tr>
              <td>
                <div className="input-group">
                  <span className="input-group-text input-label">Publisher ID</span>
                </div>
              </td>
              <td>
                <div className="drop-container">
                  <div className="input-group inner">
                    <input
                      className="form-control inp"
                      type="text"
                      name="publisherID"
                      id="publisherID"
                      value={publisherID}
                      onChange={onChangePublisherID}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group">
                  <span className="input-group-text input-label">Book Name</span>
                </div>
              </td>
              <td>
                <div className="input-group">
                  <input
                    className="form-control inp"
                    type="text"
                    name="bname"
                    id="bname"
                    value={bookName}
                    onChange={onChangeBookName}

                  />
                </div>
              </td>

            </tr>
            <tr>
              <td></td>
              <td>
                <div className="dropdown">
                  {/* {console.log(booksData)} */}
                  {booksData.filter(item => {
                    const searchitem = bookName.toLowerCase();
                    const name = item.name.toLowerCase();
                    console.log(searchitem && item.publisher_id == publisherID && name.startsWith(searchitem) && name !== searchitem)
                    return searchitem && item.publisher_id == publisherID && name.startsWith(searchitem) && name !== searchitem
                  })
                  .slice(0, 6)
                  .map((item) => {
                    // {console.log(item.name)}
                      return(<>
                      <div onClick={() => onSearchBookName(item.name, item)}
                        className="dropdown-row"
                        key={item.name}
                      >
                        {item.name}
                      </div>
                      </>)
})}
                </div>
              </td>
            </tr>
            <tr id="quan">
              <td>
                <div className="input-group" >
                  <span className="input-group-text input-label">Quantity</span>
                </div>
              </td>
              <td>
                <div className="input-group quantity-group">
                  <button
                    className="quantity-button"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    className="form-control inp quantity-input"
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={onChangeQuantity}
                  />
                  <button
                    className="quantity-button"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                </div>

              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group" >
                  <span className="input-group-text input-label">Price</span>
                </div>
              </td>
              <td>
                <div className="input-group ">

                  <input
                    className="form-control inp"
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={price}
                    onChange={onChangePrice}
                  />

                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group" >
                  <span className="input-group-text input-label">Address</span>
                </div>
              </td>
              <td>
                <div className="input-group ">

                  <textarea
                    className="form-control inp"
                    type="textarea"
                    name="address"
                    id="address"
                    rows={2}
                    cols={3}
                    value={address}
                    onChange={onChangeAddress}
                  />

                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group" >
                  <span className="input-group-text input-label">ETD</span>
                </div>
              </td>
              <td>
                <div className="input-group quantity-group">

                  <input
                    className="form-control inp"
                    type="date"
                    name="ETD"
                    id="ETD"
                    value={ETD}
                    onChange={onChangeETD}
                  />

                </div>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={handleAdd}
                >
                  Add Book
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="book-list">

        <table className="table table-light table-borderless">
          <thead>
            <tr>
              <th colspan="4">
                <h2>Book List</h2>
              </th>
            </tr>
            <tr>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Price</th>

              <th>
                <button
                  className="btn btn-sm btn-light"
                  style={{ backgroundColor: 'silver' }}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </th>

            </tr>
          </thead>
          <tbody className="tbody">
            {bookList.map((book, index) => (
              <tr key={index}>
                <td>{book.name}</td>
                <td>{book.quantity}</td>
                <td>{book.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <br />
      <button
        className="btn  btn-lg but "
        onClick={handleOrderRequest}
        disabled={bookList.length === 0} // Disable the button if the book list is empty
      >
        Order Request
      </button>

    </div>
  );
};

export default Publisher;
