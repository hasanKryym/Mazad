// Navbar.js

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import { UserContext } from "../../context/User/UserContext";
import Logo from "../../assets/images/mazadLogo-transparent.png";

const Navbar = () => {
  const { userData } = useContext(UserContext);
  const [user] = userData;

  const [showLinks, setShowLinks] = useState(false);

  const navbarLinks = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "bids",
      link: "/bids",
    },
  ];

  const navbarAccountLinks = [
    {
      name: user.status.isLoggedIn ? "my account" : "login",
      link: user.status.isLoggedIn ? "/myAccount/profile" : "/login",
    },
  ];

  const handleToggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav>
      <div className="navbar-logo">Mazad</div>
      {/* <div className="navbar-logo">
        <img src={Logo} alt="" />
      </div> */}

      {/* Toggle button for mobile view */}
      <div className="navbar-toggle" onClick={handleToggleLinks}>
        <FaBars />
      </div>

      {/* Container for regular links (centered) */}

      <div className={`navbar-links ${showLinks ? "show" : ""}`}>
        {navbarLinks.map((link) => (
          <Link key={link.name} to={link.link} className="navbar-link">
            {link.name}
          </Link>
        ))}
        {showLinks &&
          navbarAccountLinks.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className="navbar-account-link"
            >
              {link.name}
            </Link>
          ))}
      </div>

      {/* Container for account links (aligned to the right) */}
      <div className={`navbar-account-links`}>
        {navbarAccountLinks.map((link) => (
          <Link key={link.name} to={link.link} className="navbar-account-link">
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
