/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, setSearch, setSearchItem } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [searchOn, setSearchOn] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const placeholderTexts = [
    "Search 'pasta'...",
    "Looking for something?",
    "Search 'cake'...",
    "Explore our catalog...",
    "Search 'salads'...",
    "Are you hungry? ",
  ];

  const searchFood = (input) => {
    setSearchValue(input);
    setSearch(true);
    setSearchItem(input);
    console.log(input);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % placeholderTexts.length
        );
        setIsFading(false);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [placeholderTexts.length]);

  const handleSearchOpen = () => {
    setSearchOn((prevVal) => !prevVal);
    if (searchOn) {
      setSearchValue("");
      setSearch(false);
      setSearchItem("");
    }
  };
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo} alt="" className="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            contact us
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" onClick={handleSearchOpen} />

          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {searchOn ? (
        <div className="search">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => searchFood(e.target.value)}
            className={`input-field ${
              isFading ? "placeholder-fade-out" : "placeholder-fade-in"
            }`}
            placeholder={placeholderTexts[currentIndex]}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
