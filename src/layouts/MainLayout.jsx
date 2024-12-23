import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { ToastContainer } from "react-toastify";
import Cart from "../components/shared/Cart";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Draggable from "react-draggable";

const MainLayout = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="min-h-screen pt-[76px]">
                {
                    currentUser?.role === "buyer" &&
                    <Draggable>
                        <div className="fixed z-30 right-5 mt-8 cursor-move">
                            <Cart />
                        </div>
                    </Draggable>
                }
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
};

export default MainLayout;
