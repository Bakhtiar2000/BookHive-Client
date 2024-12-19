import { Link } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import { useContext } from "react"

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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/books">Books</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">BookHive</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <div className="flex justify-end items-center gap-5">
                            <p className="text-green-600 text-lg">Hello {user?.displayName} 👋</p>
                            <button className='mt-3 text-center px-5 py-3 bg-red-500 duration-300 rounded-lg text-white' onClick={handleLogOut}>Log out</button>
                        </div> :
                        <Link to="/login" className='mt-3 text-center px-5 py-3 bg-green-500 duration-300 rounded-lg text-white'>Login</Link>
                }
            </div>
        </div>
    )
}

export default Navbar
