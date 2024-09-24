import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import CartContextProvider from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';

let query= new QueryClient()

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>  },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute>  },
      { path: "brands", element:<ProtectedRoute> <Brands /> </ProtectedRoute>},
      { path: "productdetails/:id/:category", element:<ProtectedRoute> <ProductDetails /> </ProtectedRoute>},
      { path: "categories", element:<ProtectedRoute><Categories /></ProtectedRoute>  },
      { path: "login", element: <Login /> },
      { path: "products", element:<ProtectedRoute><Products /> </ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <UserContextProvider> 
        <QueryClientProvider client={query}>
          <CartContextProvider>
        <RouterProvider router={routes} />
        <Toaster/>
          </CartContextProvider>
        <ReactQueryDevtools/>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}
