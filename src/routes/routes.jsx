import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AllBooks from "../pages/AllBooks";
import SingleBook from "../pages/SingleBook";
import MyWishlist from "../pages/MyWishlist";
import CartList from "../pages/CartList";
import Checkout from "../pages/Checkout";
import MyBooks from "../pages/MyBooks";
import AddABook from "../pages/AddABook";
import AllUsers from "../pages/AllUsers";


const baseURL = "http://localhost:5000/"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/books",
                element: <AllBooks />
            },
            {
                path: "/books/:id",
                element: <SingleBook></SingleBook>,
                loader: ({ params }) => fetch(`${baseURL}books/${params.id}`)
            },
            {
                path: "/wishlist",
                element: <MyWishlist />
            },
            {
                path: "/cart",
                element: <CartList />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/addABook",
                element: <AddABook />
            },
            {
                path: "/myBooks",
                element: <MyBooks />
            },
            {
                path: "/allUsers",
                element: <AllUsers />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },

]);