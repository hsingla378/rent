import React from "react";
import { Button, Input } from "@nextui-org/react";
import Header from "./Header";

export default function Register() {
  const [error, setError] = React.useState("");

  const handleRegister = () => {
    setError("Registering not implemented yet");
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex w-80 max-w-96 gap-4 flex-col">
          <Input type="text" label="First Name" />
          <Input type="text" label="Last Name" />
          <Input type="email" label="Email" />
          <Input type="number" label="Phone" />
          <Input type="password" label="Password" />
          {/* <Input type="email" label="Email" /> */}
          <Button color="primary" onClick={handleRegister}>
            Register
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
