import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// 1️⃣ reactQuery
import { QueryClient, QueryClientProvider } from 'react-query'  

// 2️⃣ Redux : Provider, store import
import { Provider } from "react-redux";
import store from "./store.js";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 3️⃣ Redux : Provider 감싸고 store연결
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);
