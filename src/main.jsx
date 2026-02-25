import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { TokenContextProvider } from "./context/tokenContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';


const queryClient =new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>,
);
