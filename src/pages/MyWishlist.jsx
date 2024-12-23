import { useEffect, useMemo, useState } from "react";
import useBooks from "../hooks/useBooks";
import useWishlists from "../hooks/useWishlist";
import Title from "../components/shared/Title";
import WishlistCard from "../components/cards/WishlistCard";

const MyWishlist = () => {
    const [wishlistsData, wishlistsLoading, wishlistsRefetch] = useWishlists();
    const [booksData, booksLoading, booksRefetch] = useBooks();

    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem("wishlist");
        return savedLists ? JSON.parse(savedLists) : [];
    });

    useEffect(() => {
        if (!wishlistsData) wishlistsRefetch();
        if (!booksData) booksRefetch();
    }, [wishlistsRefetch, booksRefetch]);

    useEffect(() => {
        if (wishlistsData?.list) {
            setLists(wishlistsData.list);
            localStorage.setItem("wishlist", JSON.stringify(wishlistsData.list));
        }
    }, [wishlistsData]);

    const selectedBooks = useMemo(() => {
        return booksData?.filter(book => lists.includes(book._id)) || [];
    }, [booksData, lists]);

    if (wishlistsLoading || booksLoading) {
        return (
            <div className="container mx-auto text-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <Title name="My Wishlist" />
            {
                selectedBooks.map((book) => <WishlistCard key={book._id} book={book} />)
            }
        </div>
    );
};

export default MyWishlist;
