// rafce

import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import { ToastContainer } from "react-toastify"

const MainLayout = () => {
    // const { currentUser, loading } = useContext(AuthContext);
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="min-h-screen">
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
