import React, { useState } from "react";
import axios from "axios";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Register() {
  // State variables for form inputs and error handling
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    isSeller: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async () => {
    try {
      const { firstName, lastName, email, phoneNumber, password, isSeller } =
        values;
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/register",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          isSeller,
        }
      );
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="flex w-80 max-w-96 gap-4 flex-col">
          <Input
            type="text"
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            type="number"
            label="Phone"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <Checkbox
            checked={values.isSeller}
            name="isSeller"
            onChange={handleChange}
          >
            I am a Seller
          </Checkbox>
          <Button color="primary" onClick={handleRegister}>
            Register
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
