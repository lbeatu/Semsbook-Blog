import React from "react";

const profileItem = () => {
  return (
    <div className="profile-card">
      <img
        src="//im.vsco.co/aws-us-west-2/d9852d/12413090/5e96edcc981cd60675c699a6/vsco5e96edd0c4e66.jpg?w=704&dpr=1"
        alt=""
      ></img>
      <div className="profile-content">
        <p>semanur küçük</p>
        <div className="contact-card">
          <a
            className="fab fa-instagram"
            href="https://www.instagram.com/semanurkucuk/?hl=tr"
            target="_blank"
          ></a>
          <a
            className="fab fa-tumblr-square"
            href="https://vsco.co/smnrkck/gallery"
            target="_blank"
          ></a>
          <a
            className="fab fa-instagram-square"
            href="https://www.instagram.com/semsbook/"
            target="_blank"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default profileItem;
