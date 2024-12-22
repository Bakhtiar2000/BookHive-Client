// rafce

import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import { ToastContainer } from "react-toastify"
import Cart from "../components/shared/Cart"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const MainLayout = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="min-h-screen">
                {
                    currentUser?.role == "buyer" &&
                    <div className="fixed z-50 right-5 mt-5">
                        <Cart />
                    </div>
                }
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    )
}

export default MainLayout
