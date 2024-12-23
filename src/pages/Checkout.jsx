import React, { useEffect, useMemo, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import useCarts from '../hooks/useCart';
import useBooks from '../hooks/useBooks';
import Title from "../components/shared/Title";

const Checkout = () => {
    const [cartsData, cartsLoading] = useCarts();
    const [booksData, booksLoading] = useBooks();
    const [lists, setLists] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        if (cartsData?.list) {
            setLists(cartsData.list);
            localStorage.setItem("cart", JSON.stringify(cartsData.list));
        }
    }, [cartsData]);

    const selectedBooks = useMemo(() => {
        return booksData?.filter(book => lists.includes(book._id)) || [];
    }, [booksData, lists]);

    // Total Calculation
    const subtotal = useMemo(() => {
        return selectedBooks.reduce((sum, book) => sum + book.price, 0);
    }, [selectedBooks]);
    const onlineFee = 60;
    const total = (subtotal + onlineFee).toFixed(2);

    if (cartsLoading || booksLoading) return <p>Loading...</p>;

    return (
        <div className='container mx-auto'>
            <Title name="Checkout" />

            <div className='grid grid-cols-3 gap-5'>
                {/* Carts */}
                <div className='col-span-2'>
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

                {/* Summary */}
                <div className='col-span-1 rounded-lg border h-fit border-teal-500 p-5'>
                    <h2 className='text-green-500 text-2xl font-semibold text-center border-b-2 border-green-500 pb-2 mb-5'>Summary</h2>
                    <div>
                        <div className='flex justify-between items-center border-b border-dashed mb-3'>
                            <p>Subtotal:</p>
                            <p>{subtotal} Tk</p>
                        </div>
                        <div className='flex justify-between items-center border-b border-dashed mb-3'>
                            <p>Online fee:</p>
                            <p>{onlineFee} Tk</p>
                        </div>
                        <div className='flex justify-between items-center font-semibold text-lg mb-3'>
                            <p>Total:</p>
                            <p>{total} Tk</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
