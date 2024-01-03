import React, { useContext, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../context/User/UserContext";
import { homeDetails } from "./homeDetails";
import { aboutUsDetails } from "./AboutUs/aboutDetails";
import Logo from "../../assets/images/mazadLogo-transparent.png";
import bgImage from "../../assets/images/homePagebg.jpg";
import AboutUs from "./AboutUs/AboutUs";

const Home = () => {
  const { userData } = useContext(UserContext);
  const [user] = userData;

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="top-container">
          <h1 className="welcome-message">Welcome to Mazad!</h1>
          <p className="sub-message">
            Find the best deals on the items you love.
          </p>
          {/* Add your search input component here */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for bids..."
              className="search-input"
            />
            <button className="classic-button">Search</button>
          </div>
        </div>
        <div className="aboutUs-container">
          {aboutUsDetails.map((about) => {
            return <AboutUs details={about} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
