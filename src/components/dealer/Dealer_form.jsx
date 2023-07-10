import React, { useState, useEffect, useContext } from "react";
import Axios from "axios"
import { AuthContext } from "../context/AuthContext";
const Dealer = () => {
  const {data} =useContext(AuthContext);
  const [dealer_name, setDealerName] = useState("");
  const [bookName, setBookName] = useState("");
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [author, setAuthor] = useState("");
  const [address, setAddress] = useState("");
  const [ETA, setETA] = useState("")
  const [dealerID,setDealerID] =useState("");

  const [item_I, setItem] = useState("");
  const [bookList, setBookList] = useState([]); // Array to store book information
  const [booksData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/deal_inv/api-get');
        if (response.status === 200) {
          setData(response.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
        alert('Error: Failed to fetch data');
      }
    };
    setDealerName(data.id);
    document.getElementById('dealer_name').disabled=true;
    fetchData();
  }, []);


  const Popup = (arg) => {
    var popup = document.getElementById("myPopup");
    if (arg === "show") {
      document.getElementById("FORM").style.opacity = 0.3;
      document.getElementById("FORM").style.transitionDuration='500ms';
      popup.classList.add("show");
    } else if (arg === "disappear") {
      document.getElementById("FORM").style.opacity = 1;
      document.getElementById("FORM").style.transitionDuration='500ms';
      popup.classList.remove("show");
    }
  };

  const onChangeDealer_name = (event) => {
    setDealerName(event.target.value);
  };

  const onChangeBookName = (event) => {
    setBookName(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value)); // Convert the value to an integer
  };


  const onChangeETA = (event) => {
    setETA(event.target.value);
  }

  const onChangeAddress = (event) => {
    setAddress(event.target.value);
  }

  const onSearchBookName = (searchTerm, item) => {
    setBookName(searchTerm);
    setQuantity(item.quantity);
    setDealerID(item.dealer_id);
    setAuthor(item.author);
    setItem(item.quantity);
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

    if (item_I < quantity && dealer_name !== "" && bookName !== "" && quantity !== "" && author !== "" && ETA !== "" && address !== "") {
      Popup("show");
      document.getElementById("quan").style.border = "5px solid red";
      document.getElementById("popupText").textContent = "Quantity is higher";

    } else if (dealer_name !== "" && bookName !== "" && quantity !== "" && item_I >= quantity && author !== "" && ETA !== "" && address !== "") {
      Popup("disappear");
      const bookInfo = {
        name: bookName,
        quantity: quantity,
        author: author,

      };

      document.getElementById("quan").style.border = "none";
      

      setBookList([...bookList, bookInfo]); // Add book information to the bookList array
      setBookName("");
      setQuantity(1);
      setAuthor("");
    }
    else {
      Popup("show");
      
      document.getElementById("popupText").textContent = "Enter all fields";

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
    /*console.log(dealerID)*/
    if (bookList.length > 0) {
      /*console.log(bookList)*/
      let dataSend = { "dealer_id": dealerID,dealer_name:data.id, "books": bookList, "ETA": ETA, "address": address, "stat": "pending" }
      console.log(dataSend)
      fetch('http://localhost:3001/deal/dealer-request', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setBookList([]);
          setAddress("");
          setETA("");
          Popup("show");
          
          document.getElementById("popupText").textContent = "Data is send to the database";
          document.getElementById("popupText").style.color = "Green";
          document.getElementById("closebutton").style.color = "Green";
          
        })
        .catch((error) => console.error("Error: ", error));
      } else {
        Popup("show");
        document.getElementById("popupText").textContent = "Book List is empty";
      }
      window.location.reload();
  }

  return (
    <div className="text-center ">
      <h1 className="h1">DEALER FORM</h1>
      
      <div className="popup">
        <span className="popuptext" id="myPopup">
          <span id="popupText">Quantity is higher</span>
          <button className="close-btn" onClick={() => Popup("disappear")}>
            &times;
          </button>
        </span>
      </div>

      <div className="container1" id="FORM">
        <table className="container2 table table-borderless">
          <tbody>
            <tr>
              <td>
                <div className="input-group">
                  <span className="input-group-text-span input-label">Dealer Name</span>
                </div>
              </td>
              <td>
                <div className="drop-container">
                  <div className="input-group inner">
                    <input
                      className="form-control inp"
                      type="text"
                      name="dealer_name"
                      id="dealer_name"
                      value={dealer_name}
                      onChange={onChangeDealer_name}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group">
                  <span className="input-group-text-span input-label">Book Name</span>
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
                  {booksData.filter(item => {
                    const searchitem = bookName.toLowerCase();
                    const name = item.name.toLowerCase();
                    return searchitem && name.startsWith(searchitem) && name !== searchitem
                  })
                    .slice(0, 6)
                    .map((item) => (
                      <div onClick={() => onSearchBookName(item.name, item)}
                        className="dropdown-row"
                        key={item.name}
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              </td>
            </tr>
            <tr id="quan">
              <td>
                <div className="input-group" >
                  <span className="input-group-text-span input-label">Quantity</span>
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
                <div className="input-group">
                  <span className="input-group-text-span input-label">Author</span>
                </div>
              </td>
              <td>
                <div className="input-group">
                  <input
                    className="form-control inp"
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    disabled
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="input-group" >
                  <span className="input-group-text-span input-label">Address</span>
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
                  <span className="input-group-text-span input-label">ETA</span>
                </div>
              </td>
              <td>
                <div className="input-group quantity-group">

                  <input
                    className="form-control inp"
                    type="date"
                    name="ETA"
                    id="ETA"
                    value={ETA}
                    onChange={onChangeETA}
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
              <th>Author</th>
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
          <tbody>
            {bookList.map((book, index) => (
              <tr key={index}>
                <td>{book.name}</td>
                <td>{book.quantity}</td>
                <td>{book.author}</td>


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
        className="btn  btn-lg but"
        onClick={handleOrderRequest}
        disabled={bookList.length === 0} // Disable the button if the book list is empty
      >
        Order Request
      </button>

    </div>
  );
};

export default Dealer;
