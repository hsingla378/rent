import React from "react";
import { Button, Input } from "@nextui-org/react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  async function handleLogin() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    }
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-[90vh]">
        <div className="w-96 max-w-96 flex flex-col gap-5">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
