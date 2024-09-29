import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '10px' }}>{content}</h3>
          <img
            src='https://i.imgur.com/1rlZMUv.png'
            alt="maskotka"
            style={{ width: '50px', height: '50px', borderRadius: '5%' }}
          />
        </div>
      </header>
    </div>
  );
  
};

export default Home;
