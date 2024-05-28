import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isSeller");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("phoneNumber");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center px-6 py-3  bg-blue-500 text-white mb-12">
      <Link to={"/"}>
        <h1 className="text-xl font-bold">Rentify</h1>
      </Link>
      <div className="flex justify-center items-center gap-4">
        {/* <input placeholder="Search" /> */}
        {!localStorage.getItem("token") && (
          <>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
            <Link to={"/register"}>
              <button>Register</button>
            </Link>
          </>
        )}
        {localStorage.getItem("firstName") && (
          <p className="font-semibold">
            Hi, {localStorage.getItem("firstName")}
          </p>
        )}
        {localStorage.getItem("isSeller") && (
          <Button size="sm" color="warning" className="font-semibold">
            <Link to={"/dashboard"}>Dashboard</Link>
          </Button>
        )}
        {localStorage.getItem("token") && (
          <Button
            size="sm"
            // color="danger"
            className="font-semibold bg-red-600 text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
