import React from "react";
import About from "../About/About";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import Courses from "../Courses/Courses";
import DrivingLicense from "../DrivingLicense/DrivingLicense";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <About></About>
      <Courses></Courses>
      <DrivingLicense></DrivingLicense>
      {/* <Services></Services> */}
    </>
  );
};

export default Home;
