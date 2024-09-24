import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <div>
        <nav className=" border-gray-200 left-0 right-0 fixed top-0 bg-slate-300">
          <div className="flex flex-wrap justify-center md:justify-between  items-center mx-auto max-w-screen-xl p-4">
            <div className="flex items-center gap-5">
              <Link
                to=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src={logo}
                  width="110px"
                  className="h-8"
                  alt="Flowbite Logo"
                />
              </Link>
              {userLogin !== null ? (
                <>
                  <ul className="flex gap-4">
                    <li>
                      <Link to="">Home</Link>
                    </li>
                    <li>
                      <Link to="cart">Cart</Link>
                    </li>
                    <li>
                      <Link to="products">Products</Link>
                    </li>
                    <li>
                      <Link to="categories">Categories</Link>
                    </li>
                    <li>
                      <Link to="brands">Brands</Link>
                    </li>
                  </ul>
                </>
              ) : null}
            </div>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <div className="icons flex gap-4">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-linkedin"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-tiktok"></i>
                <i className="fab fa-twitter"></i>
              </div>
              <div className="links flex gap-4">
                {userLogin != null ? (
                  <span onClick={signOut} className="text-sm cursor-pointer">
                    SignOut
                  </span>
                ) : (
                  <>
                    <Link to="login" className="text-sm ">
                      Login
                    </Link>
                    <Link to="register" className="text-sm ">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
