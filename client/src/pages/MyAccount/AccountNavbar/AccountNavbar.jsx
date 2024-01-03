import "./AccountNavbar.css";
import { NAVBAR_LINKS } from "../pagesEnum";
import { Link, useLocation } from "react-router-dom";

const AccountNavbar = () => {
  const location = useLocation();

  return (
    <div className="account-navbar_container">
      <ul className="account-navbar">
        {NAVBAR_LINKS.map(({ icon, name, link }) => {
          const isActive = location.pathname === link;
          const classes = `account-nav-link ${isActive ? "selected" : ""}`;

          return (
            <Link key={name} className={classes} to={link}>
              <li>{icon}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
export default AccountNavbar;
