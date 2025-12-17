import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import router from "./routes/Routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>
);
