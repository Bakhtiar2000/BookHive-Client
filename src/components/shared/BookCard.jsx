import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWishlist from "../../hooks/useWishlist";
import useCarts from "../../hooks/useCart";
import { AuthContext } from "../../providers/AuthProvider";
import { GoHeart, GoHeartFill } from "react-icons/go";
import useAxiosSecure from "../../hooks/useAxios";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";

const BookCard = ({ book }) => {
    const { _id, title, author, genre, publishedYear, isbn, price, rating, availableCopies, coverImageUrl, description, language, pageCount, publisher } = book;
    const { currentUser } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const [wishlistsData, wishlistsLoading, wishlistsRefetch] = useWishlist();
    const [cartsData, cartsLoading, cartsRefetch] = useCarts();

    const [wishlistStatus, setWishlistStatus] = useState(false);
    const [cartStatus, setCartStatus] = useState(false);

    useEffect(() => {
        if (wishlistsData?.list || cartsData?.list) {
            setWishlistStatus(wishlistsData?.list?.includes(_id));
            setCartStatus(cartsData?.list?.includes(_id));
        }
    }, [wishlistsData, cartsData, _id]);

    const onAddWishlist = () => {
        axiosSecure.post(`/wishlist/${currentUser?.email}`, { item: _id })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Added To Wishlist", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    });
                    wishlistsRefetch();
                }
            })
            .catch(error => console.log(error));
    };

    const onRemoveWishlist = () => {
        axiosSecure.patch(`/wishlist/${currentUser?.email}`, { item: _id })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Removed From Wishlist", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    });
                    wishlistsRefetch();
                }
            })
            .catch(error => console.log(error));
    };

    const onAddToCart = () => {
        axiosSecure.post(`/cart/${currentUser?.email}`, { item: _id })
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
        <div className="relative card bg-base-100 shadow-lg">
            {
                !wishlistStatus ?
                    <GoHeart onClick={onAddWishlist} className="absolute top-2 right-5 hover:right-3 cursor-pointer text-4xl text-teal-500 hover:text-5xl hover:text-green-600 duration-200" /> :
                    <GoHeartFill onClick={onRemoveWishlist} className="absolute top-2 right-5 hover:right-3 cursor-pointer text-4xl text-green-500 hover:text-5xl duration-200" />
            }
            <img className="w-1/2 h-1/2 mx-auto" src={coverImageUrl} alt={title} />
            <div className="card-body px-5 p-3">
                <Link to={`/books/${_id}`} className="card-title text-teal-500 cursor-pointer hover:underline duration-300">{title}</Link>
                <p>By {author}</p>
                <p>Rating: {rating} / 5</p>
                <p className="text-lg">
                    <span className="line-through mr-3 text-red-600">${(Number(price)) * 3}</span>
                    <span className="text-green-500 font-semibold">${price}</span>
                </p>
                {
                    !cartStatus ?
                        <div onClick={onAddToCart} className="w-full btn bg-teal-500">
                            <button className="text-white">Add to cart</button>
                        </div> :
                        <div className="w-full btn btn-disabled border flex items-center justify-center gap-0">
                            <p>Added to cart</p>
                            <FaCartPlus className="text-lg" />
                        </div>
                }
            </div>
        </div>
    );
};

export default BookCard;
