import { useEffect, useState, useMemo } from "react";
import useBooks from "../hooks/useBooks";
import useWishlists from "../hooks/useWishlist";
import Title from "../components/shared/Title";

const MyWishlist = () => {
    const [wishlistsData, wishlistsLoading, wishlistsRefetch] = useWishlists();
    const [booksData, booksLoading, booksRefetch] = useBooks();
    if (wishlistsLoading || booksRefetch) return <p> Loading... </p>

    const [lists, setLists] = useState([]);

    useEffect(() => {
        if (wishlistsData?.list && wishlistsData.list !== lists) {
            setLists(wishlistsData.list);
        }
    }, [wishlistsData, lists]);

    const selectedBooks = useMemo(() => {
        if (booksData?.length && lists.length) {
            return booksData.filter(book => lists.includes(book._id));
        }
        return [];
    }, [booksData, lists]);

    return (
        <div className="container mx-auto">
            <Title name="My Wishlist" />
            {
                selectedBooks.map(book => (
                    <div key={book._id} className="flex gap-5 justify-between border p-5 rounded-lg shadow-md mb-4 max-w-4xl mx-auto">
                        <img className="w-40 h-min" src={book.coverImageUrl} alt={book.title} />
                        <div>
                            <p className='text-3xl font-semibold'>{book.title}</p>
                            <p className='text-lg mt-2 mb-1'>by <span className='text-blue-500 cursor-pointer hover:underline text-xl font-semibold'>{book.author}</span></p>
                            <p className='mb-5'>Genre: {book.genre}</p>
                            <p>Publisher: {book.publisher}</p>
                            <p className='mt-2'>Rating: {book.rating} / 5</p>
                            <p className="text-lg mt-2">
                                <span className="line-through mr-3 text-red-600">${(Number(book.price)) * 3}</span>
                                <span className="text-green-500 font-semibold">${book.price}</span>
                            </p>
                        </div>
                        <div className="btn bg-teal-500 mt-10">
                            <button className="text-white">Add to cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MyWishlist;
