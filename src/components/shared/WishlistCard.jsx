import React, { useContext, useEffect, useState } from 'react';
import useCarts from '../../hooks/useCart';
import useAxiosSecure from '../../hooks/useAxios';
import { AuthContext } from '../../providers/AuthProvider';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WishlistCard = ({ book }) => {
    const [cartsData, cartsLoading, cartsRefetch] = useCarts();
    const [cartStatus, setCartStatus] = useState(false);

    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (cartsData?.list) {
            setCartStatus(cartsData?.list?.includes(book._id));
        }
    }, [cartsData, book._id]);
    const onAddToCart = () => {
        axiosSecure.post(`/cart/${currentUser?.email}`, { item: book._id })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Added To Cart", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    });
                    cartsRefetch();
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <div className="flex gap-5 justify-between border p-5 rounded-lg shadow-md mb-4 max-w-4xl mx-auto">
            {/* Image + Specification */}
            <div className="flex items-center gap-5">
                {/* Image */}
                <img
                    className="w-40 h-min"
                    src={book.coverImageUrl}
                    alt={book.title}
                />
                {/* Specification */}
                <div>
                    <p className="text-3xl font-semibold">{book.title}</p>
                    <p className="text-lg mt-2 mb-1">
                        by{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline text-xl font-semibold">
                            {book.author}
                        </span>
                    </p>
                    <p className="mb-5">Genre: {book.genre}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p className="mt-2">Rating: {book.rating} / 5</p>
                    <p className="text-lg mt-2">
                        <span className="line-through mr-3 text-red-600">
                            ${Number(book.price) * 3}
                        </span>
                        <span className="text-green-500 font-semibold">
                            ${book.price}
                        </span>
                    </p>
                </div>
            </div>
            {/* Button */}
            {
                !cartStatus ?
                    <div onClick={() => onAddToCart(book._id)} className="btn bg-teal-500">
                        <button className="text-white">Add to cart</button>
                    </div> :
                    <div className="btn btn-disabled border flex items-center justify-center gap-0">
                        <p>Added to cart</p>
                        <FaCartPlus className="text-lg" />
                    </div>
            }
            {/* <button
                        onClick={() => onAddToCart(book._id)}
                        className="btn bg-teal-500 text-white mt-10"
                    >
                        Add to cart
                    </button> */}
        </div>
    );
};

export default WishlistCard;