import React from "react";
import book1 from "../images/book1.jpeg";
import book2 from "../images/book2.jpeg";
import book3 from "../images/book3.jpeg";
const Body = () => {
  return (
    <div id="body">
      <center>
        <h3>Top Categories</h3>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque amet nisi qui pariatur architecto vero sunt quo laudantium, nostrum nobis incidunt. Praesentium tenetur eveniet perferendis iste recusandae velit magnam? Asperiores omnis reiciendis, voluptatibus quidem facilis eaque deleniti repudiandae adipisci aut optio, vero ea enim cupiditate aspernatur. Ratione, eius praesentium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptas nesciunt natus quam dolores. Similique accusantium molestiae impedit, culpa quae modi illo beatae iure magnam, alias vitae tenetur est! Laborum, cum praesentium repellendus consectetur porro laboriosam voluptatum? Ipsa distinctio laborum sapiente nemo expedita, dignissimos officia nihil blanditiis quae fugiat esse. Cumque ea officiis unde laboriosam magni eligendi praesentium illo, a culpa ullam laudantium doloremque rem voluptatem aspernatur, molestiae, omnis sunt atque suscipit cum esse veritatis. Doloremque nisi voluptatem provident mollitia amet, asperiores fugit consequuntur nihil magnam velit in deleniti aliquam. Numquam non ea ratione odio, harum quaerat deserunt dolore explicabo.
      </div>
    </div>
  );
};

export default Body;
