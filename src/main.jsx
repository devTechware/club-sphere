import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <h1 className="text-4xl font-bold text-center mt-10">Club Sphere</h1>
        <Toaster position="top-right" />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>
);