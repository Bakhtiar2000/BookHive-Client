import { Link } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import { useContext, useEffect, useMemo, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import NavItems from "./NavItems"
import useCarts from "../../hooks/useCart"
import useBooks from "../../hooks/useBooks"

const Navbar = () => {
    const { user, logOut, currentUser } = useContext(AuthContext)
    const [cartsData, cartsLoading, cartsRefetch] = useCarts();
    const [booksData, booksLoading, booksRefetch] = useBooks();

    if (cartsLoading || booksLoading) return <p> Loading... </p>
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (cartsData?.list && cartsData.list !== lists) {
            setLists(cartsData.list);
        }
    }, [cartsData, lists]);

    const selectedBooks = useMemo(() => {
        if (booksData?.length && lists.length) {
            return booksData.filter(book => lists.includes(book._id));
        }
        return [];
    }, [booksData, lists]);
    console.log(selectedBooks)

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
                                    <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] md:w-96 w-80 p-2 shadow overflow-h-scroll">
                                        {
                                            selectedBooks.map(book => (
                                                <div className="flex gap-3 border border-teal-200 rounded mb-3 p-2 shadow-lg">
                                                    <img className="w-20 md:w-24 object-cover h-min" src={book.coverImageUrl} alt="" />
                                                    <div>
                                                        <p className='font-semibold'>{book.title}</p>
                                                        <p className='mt-2 mb-1'>by {book.author}</p>
                                                        <p className='mb-2 text-sm'>Genre: {book.genre}</p>


                                                        <p className="text-lg">
                                                            <span className="line-through mr-3 text-red-600">${(Number(book.price)) * 3}</span>
                                                            <span className="text-green-500 font-semibold">${book.price}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
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
