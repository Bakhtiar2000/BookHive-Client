import React, { useEffect, useMemo, useState } from 'react';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import useCarts from "../../hooks/useCart";
import useBooks from "../../hooks/useBooks";

const Cart = () => {
    const [cartsData, cartsLoading, cartsRefetch] = useCarts();
    const [booksData, booksLoading, booksRefetch] = useBooks();
    const [lists, setLists] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // useEffect(() => {
    //     if (!cartsData) cartsRefetch();
    //     if (!booksData) booksRefetch();
    // }, [cartsRefetch, booksRefetch]);

    useEffect(() => {
        if (cartsData?.list) {
            setLists(cartsData.list);
            localStorage.setItem("cart", JSON.stringify(cartsData.list));
        }
    }, [cartsData]);

    const selectedBooks = useMemo(() => {
        return booksData?.filter(book => lists.includes(book._id)) || [];
    }, [booksData, lists]);

    if (cartsLoading || booksLoading) {
        return null
    }

    return (
        <div className="dropdown dropdown-bottom dropdown-end">

            {/* Cart Icon */}
            <div tabIndex={0} role="button" className="text-teal-500 text-lg md:text-2xl">
                <div className="relative rounded-full border border-green-500 cursor-pointer p-3 hover:bg-green-500 group duration-200">
                    <FaShoppingCart className="text-green-500 text-lg md:text-xl group-hover:text-white duration-200" />
                    <p className=' bg-green-500 px-2  rounded-full absolute text-base text-white -top-2 -right-2'>
                        {cartsData?.list?.length}
                    </p>
                </div>
            </div>

            {/* Dropdown */}
            <div
                tabIndex={0}
                className="dropdown-content menu rounded-box z-[999] md:w-96 w-80 shadow bg-white">
                {/* Scrollable Content */}
                <div className="max-h-96 overflow-y-auto p-2">
                    {selectedBooks.map((book) => (
                        <div
                            key={book._id}
                            className="flex gap-3 bg-white rounded mb-3 p-2 shadow-lg"
                        >
                            {/* Image */}
                            <img
                                className="w-20 md:w-24 object-cover h-min"
                                src={book.coverImageUrl}
                                alt={book.title}
                            />

                            {/* Specification */}
                            <div className="flex-1">
                                <p className="font-semibold">{book.title}</p>
                                <div className="flex justify-between items-center gap-3">
                                    <div>
                                        <p className="mt-2 mb-1">by {book.author}</p>
                                        <p className="mb-2 text-sm">Genre: {book.genre}</p>
                                    </div>

                                    {/* Quantity */}
                                    <div className="flex items-center border-2 border-black">
                                        <div className="px-1 cursor-pointer">
                                            <FaPlus />
                                        </div>
                                        <p className="font-bold border-r-2 border-r-black border-l-2 border-l-black p-2">1</p>
                                        <div className="px-1 cursor-pointer">
                                            <FaMinus />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg">
                                    <span className="line-through mr-3 text-red-600">
                                        ${Number(book.price) * 3}
                                    </span>
                                    <span className="text-green-500 font-semibold">
                                        ${book.price}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Checkout Button */}
                <div className="bg-white p-2 shadow-top sticky bottom-0">
                    <button className="btn bg-gray-500 text-white w-full">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Cart;