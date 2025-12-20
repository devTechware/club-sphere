import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./routes/Routes";
import AuthProvider from "./providers/AuthProvider";
import QueryProvider from "./providers/QueryProvider";
import StripeProvider from "./providers/StripeProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <StripeProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </StripeProvider>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
