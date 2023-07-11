import React from "react";
import book1 from "../images/book1.jpeg";
import book2 from "../images/book2.jpeg";
import book3 from "../images/book3.jpeg";
const Body = () => {
  return (
    <div id="body">
      <center>
        <h3>About us</h3>
      </center>
      <div id="categ">
        <div className="categ-img">
          <img src={book1} alt="" />
        </div>
        <div className="categ-img">
          <img src={book2} alt="" />
        </div>
        <div className="categ-img">
          <img src={book3} alt="" />
        </div>
      </div>
      <div id="categ-cont">
      Welcome to Bookworm, your go-to platform for connecting dealers, publishers, and myself in the exciting world of books. As the founder of this innovative website, I am thrilled to offer a centralized hub where dealers and publishers can seamlessly manage their inventories and conduct business with ease.

At Bookworm, I understand the importance of efficiency and convenience. With our user-friendly interface, dealers can effortlessly browse through a vast catalog of books, explore various genres, and discover new titles. They can easily place orders, track shipments, and manage their inventory—all at their fingertips.
For publishers, Bookworm presents an invaluable opportunity to showcase their publications and reach a wider audience. By leveraging our platform, they can connect directly with eager dealers, expanding their distribution network and boosting sales. With real-time analytics and reporting tools, publishers can gain insights into market trends, enabling them to make informed decisions and refine their strategies.

As the middleman, I ensure smooth communication and seamless transactions between dealers and publishers. I facilitate negotiations, handle logistics, and provide a secure payment system, giving both parties the peace of mind to focus on what they do best—bringing remarkable books to readers.

Bookworm is not just a website; it's a community passionate about literature. With our interactive forums and discussion boards, dealers and publishers can connect, exchange ideas, and foster collaborations. Together, we can celebrate the power of storytelling and nurture a vibrant literary ecosystem.

Join me at Bookworm and discover a world of endless possibilities for your business. Whether you're a dealer searching for the next bestseller or a publisher looking to expand your reach, Bookworm is the ultimate destination for all your literary aspirations. Let's embark on this exciting journey together and make the book industry thrive.
      </div>
    </div>
  );
};

export default Body;
