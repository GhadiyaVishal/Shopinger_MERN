import React from "react";
import Cetegories from "../component/Cetegories";
import Newsletter from "../component/Newsletter";
import Products from "../component/Products";
import Slider from "../component/Slider";

const Homepage = () => {
  return (
    <>
      <Slider />
      <Cetegories />
      <Products />
      <Newsletter />
    </>
  );
};

export default Homepage;
