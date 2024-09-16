import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import menu from "../../assets/menu.png"
  

function Navbar() {
  const [open, setOpen] = useState(false);


  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src={logo} alt="" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
          {/* <div className="user">
            <img src={noavatar} alt="" />
            <span>llll</span>
            <Link to="/profile" className="profile">
              <div className="notification">2</div>
              <span>Profile</span>
            </Link>
          </div> */}
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        <div className="menuIcon">
          <img
            src=
            {menu}
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
