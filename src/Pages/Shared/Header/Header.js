import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { GiShoppingCart } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";
import { MdOutlinePassword } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { MdAutoDelete } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  console.log(user?.photoURL);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.setItem("token", "");
        toast.success("Successfully logged out");
      })
      .catch((error) => toast.error(error?.message));
  };

  const menuItems = (
    <>
      <li className="font-serif">
        <Link to="/">Home</Link>
      </li>
      <li className="font-serif">
        <Link to="/more-courses">Courses</Link>
      </li>

      <li className="font-serif">
        <Link to="/old_products">Buy/Sell Products</Link>
      </li>
      <li className="font-serif">
        <Link to="/new_products">New Products</Link>
      </li>
      <li className="font-serif">
        <Link to="/about">About</Link>
      </li>
      <li className="font-serif">
        <Link to="/having_trouble">Having Trouble</Link>
      </li>
      {user?.email && user?.emailVerified ? (
        <>
          <li className="font-serif">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </>
      ) : (
        <>
          <li className="font-serif">
            <Link to="/login">Login</Link>
          </li>
          <li className="font-serif">
            <Link to="/signup">Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar h-20  pt-12 bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img className="w-16" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>

      <div className="navbar-end space-x-2">
        {user?.uid && user?.emailVerified && (
          <>
            <div className="flex justify-end">
              <Link to={`/my_favorite`} className="btn btn-outline m-1">
                <FaCarAlt className="text-2xl hover:text-red-600" />
              </Link>
              <Link to={`/add_to_card`} className="btn btn-outline m-1">
                {/* <GiShoppingCart className="text-2xl" /> */}
                <HiOutlineShoppingCart className="text-2xl" />
              </Link>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt=""
                    src={
                      user?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/2555/2555013.png"
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/new_products/chnage_password">
                    <div className="flex m-1">
                      <MdOutlinePassword className="text-xl mr-2" />
                      <span>Reset Password</span>
                    </div>
                  </Link>
                </li>
                {/* /new_products/reset_password */}
                <li>
                  <Link to="/reset_password">
                    <div className="flex m-1">
                      <MdLockReset className="text-xl mr-2" />
                      <span>Forget Password</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/delete_account">
                    <div className="flex m-1">
                      <MdAutoDelete className="text-xl mr-2" />
                      <span>Delete Account</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-error btn-outline text-white hidden lg:block mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
