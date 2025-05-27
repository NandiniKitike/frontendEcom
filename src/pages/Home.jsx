import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import BottomText from "../components/BottomText";
const Home = () => {
  return (
    <div className="mt-10">
      <Banner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <BottomText />
    </div>
  );
};

export default Home;
