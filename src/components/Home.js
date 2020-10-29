import React, { useState } from "react";

const Home = () => {
  const [content] = useState("");

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;
