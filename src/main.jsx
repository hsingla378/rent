import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ToastBar, Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <NextUIProvider>
      <Toaster>
        {(t) => (
          <ToastBar
            toastOptions={{
              success: {
                style: {
                  background: "green",
                },
              },
              error: {
                style: {
                  background: "red",
                },
              },
            }}
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 1s ease"
                : "custom-exit 1s ease",
              // border: "2px solid blue",
            }}
          />
        )}
      </Toaster>
      <App />
    </NextUIProvider>{" "}
  </BrowserRouter>
  // </React.StrictMode>
);
