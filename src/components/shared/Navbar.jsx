import { Link } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import NavItems from "./NavItems"

const Navbar = () => {
    const { user, logOut, currentUser } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
        navigate("/login")
    }
    return (
        <div className="navbar bg-base-200">
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
                <a className="btn btn-ghost text-xl">BookHive</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <NavItems />
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <div className="flex justify-end items-center gap-5">
                            {
                                currentUser?.img ? (
                                    <img
                                        className="mt-3 cursor-pointer w-10 h-10 rounded-full border border-teal-300"
                                        src={currentUser.img}
                                        alt="Profile"
                                    />
                                ) : (
                                    <p className="mt-3 w-10 h-10 text-center text-lg font-semibold hover:bg-teal-500 py-1 hover:text-white rounded-full border cursor-pointer duration-300 border-teal-300 text-black">
                                        {currentUser?.name?.split(' ')
                                            .filter(word => word.length > 2)
                                            .slice(0, 2)
                                            .map(word => word[0])
                                            .join('')}
                                    </p>
                                )
                            }
                            {
                                currentUser?.role == "buyer" &&
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="mt-2 text-teal-500 text-2xl"><FaShoppingCart /></div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li><a>Item 1</a></li>
                                        <li><a>Item 2</a></li>
                                    </ul>
                                </div>
                            }
                            <button className='mt-3 text-center px-5 py-3 bg-red-500 duration-300 rounded-lg text-white' onClick={handleLogOut}>Log out</button>
                        </div> :
                        <Link to="/login" className='mt-3 text-center px-5 py-3 bg-green-500 duration-300 rounded-lg text-white'>Login</Link>
                }
            </div>
        </div>
    )
}

export default Navbar
