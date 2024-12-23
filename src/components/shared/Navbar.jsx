import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useMemo, useState } from "react";
import NavItems from "./NavItems";
import logo from "../../assets/BookHive Name.png"

const Navbar = () => {
    const { user, logOut, currentUser } = useContext(AuthContext);
    const [navState, setNavState] = useState(false);
    const navigate = useNavigate();

    const onNavScroll = () => {
        if (window.scrollY > 300) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", onNavScroll);
    }, []);

    const handleLogOut = () => {
        logOut()
            .then(() => navigate("/login"))
            .catch((err) => console.error("Logout Error:", err));
    };

    return (
        <div className={`fixed z-50 navbar py-4 bg-base-200 ${navState ? 'backdrop-blur-md bg-opacity-30 shadow-primary/20 duration-300' : 'backdrop-blur-md'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <NavItems />
                    </ul>
                </div>
                <Link to="/" className=" ">
                    <img className="w-40" src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex justify-center gap-5 px-1">
                    <NavItems />
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ? (
                        <div className="flex justify-end items-center gap-3 md:gap-5 ">
                            {
                                currentUser?.img ? (
                                    <img
                                        className="cursor-pointer w-8 md:w-10 h-8 md:h-10 rounded-full"
                                        src={currentUser.img}
                                        alt="Profile"
                                    />
                                ) : (
                                    <p className="w-8 md:w-10 h-8 md:h-10 text-center text-lg font-semibold hover:bg-gray-300 py-1 hover:text-white rounded-md uppercase border cursor-pointer duration-300 border-orange-500 hover:border-gray-300 text-orange-500">
                                        {currentUser?.name?.split(' ')
                                            .filter(word => word.length > 2)
                                            .slice(0, 2)
                                            .map(word => word[0])
                                            .join('')}
                                    </p>
                                )
                            }
                            <button
                                className="text-center text-lg font-semibold text-orange-500 mr-3"
                                onClick={handleLogOut}
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-center text-lg font-semibold text-green-500 mr-3"
                        >
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
