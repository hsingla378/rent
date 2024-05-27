import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3  bg-blue-500 text-white mb-12">
      <Link to={"/"}>
        <h1 className="text-xl font-bold">Rentify</h1>
      </Link>
      <div className="flex justify-center items-center gap-4">
        {/* <input placeholder="Search" /> */}
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>

        <Button size="sm" color="warning" className="font-semibold">
          <Link to={"/dashboard"}>Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
