import React from "react";
import logo from "../../img/logo.png";

const Home = () => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center"
        style={{
          height: "80vh",
        }}
      >
        <img alt="Your Company" src={logo} className="h-20 w-auto" />
      </div>
    </>
  );
};

export default Home;
