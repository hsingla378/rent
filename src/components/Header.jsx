import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3  bg-blue-500 text-white">
      <Link to={"/"}>
        <h1 className="text-xl font-bold">Rentify</h1>
      </Link>
      <div className="flex gap-4">
        {/* <input placeholder="Search" /> */}
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
