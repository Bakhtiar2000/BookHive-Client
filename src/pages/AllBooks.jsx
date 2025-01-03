import { useEffect, useState } from "react";
import BookCard from "../components/cards/BookCard";
import Title from "../components/shared/Title";
import { useForm } from "react-hook-form";
import useBooks from "../hooks/useBooks";
import { useLocation } from "react-router-dom";

const AllBooks = () => {
    const [filteredBooks, setFilteredBooks] = useState([]);
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paramAuthor = queryParams.get("author");
    const paramPublisher = queryParams.get("publisher");

    const [booksData, booksLoading] = useBooks();

    useEffect(() => {
        if (!booksLoading && booksData) {
            setFilteredBooks(booksData);
        }
    }, [booksData, booksLoading]);

    const allGenres = booksData ? [...new Set(booksData.flatMap((book) => book.genre))] : [];
    const allPublishers = booksData ? [...new Set(booksData.map((book) => book.publisher))] : [];
    const allAuthors = booksData ? [...new Set(booksData.flatMap((book) => book.author))] : [];

    useEffect(() => {
        if (!booksLoading && booksData) {
            let updatedBooks = [...booksData];

            if (paramAuthor) {
                updatedBooks = updatedBooks.filter((book) =>
                    book.author.includes(paramAuthor)
                );
            }

            if (paramPublisher) {
                updatedBooks = updatedBooks.filter((book) =>
                    book.publisher === paramPublisher
                );
            }

            setFilteredBooks(updatedBooks);
        }
    }, [booksData, booksLoading, paramAuthor, paramPublisher]);


    const applyFilters = (data) => {
        if (!booksData) return;

        let updatedBooks = [...booksData];

        if (data.search) {
            updatedBooks = updatedBooks.filter((book) =>
                book.title.toLowerCase().includes(data.search.toLowerCase())
            );
        }
        if (data.genre?.length > 0) {
            updatedBooks = updatedBooks.filter((book) =>
                data.genre.some((genre) => book.genre.includes(genre))
            );
        }
        if (data.publisher?.length > 0) {
            updatedBooks = updatedBooks.filter((book) =>
                data.publisher.includes(book.publisher)
            );
        }
        if (data.author?.length > 0) {
            updatedBooks = updatedBooks.filter((book) =>
                data.author.some((author) => book.author.includes(author))
            );
        }
        if (data.price) {
            updatedBooks.sort((a, b) =>
                data.price === "asc" ? a.price - b.price : b.price - a.price
            );
        }

        setFilteredBooks(updatedBooks);
    };

    if (booksLoading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Title name="All Books" />
                    <label htmlFor="my-drawer-2" className="fixed z-20 top-16 btn bg-teal-50 text-teal-500 rounded-full drawer-button lg:hidden me-auto mt-3 ms-3">
                        <span className="menu-icon">☰</span>
                    </label>
                    <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 duration-300 px-2 mb-10 mx-auto">
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                </div>
                <div className="drawer-side z-30">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <form
                        className="menu bg-base-200 text-base-content min-h-full w-80 p-4"
                        onSubmit={handleSubmit(applyFilters)}
                    >
                        <div className="flex flex-col gap-5 mb-5">
                            {/* Search */}
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Search by book name"
                                    className="input input-bordered w-24 md:w-auto"
                                    {...register("search")}
                                />
                            </div>

                            {/* Filter by Genre */}
                            <div>
                                <h2 className="mb-2 text-gray-900 text-lg">Filter by Genre</h2>
                                {allGenres.map((genre, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input type="checkbox" value={genre} {...register("genre")} />
                                        <p>{genre}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Filter by Publisher */}
                            <div>
                                <h2 className="mb-2 text-gray-900 text-lg">Filter by Publisher</h2>
                                {allPublishers.map((publisher, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            value={publisher}
                                            {...register("publisher")}
                                        />
                                        <p>{publisher}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Filter by Author */}
                            <div>
                                <h2 className="mb-2 text-gray-900 text-lg">Filter by Author</h2>
                                {allAuthors.map((author, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input type="checkbox" value={author} {...register("author")} />
                                        <p>{author}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Sort by Price */}
                            <div>
                                <h2 className="mb-2 text-gray-900 text-lg">Sort by Price</h2>
                                <div>
                                    <input
                                        type="radio"
                                        name="price"
                                        value="asc"
                                        id="asc"
                                        {...register("price")}
                                    />
                                    <label htmlFor="asc" className="pl-2 pr-5">
                                        Low to High
                                    </label>
                                    <input
                                        type="radio"
                                        name="price"
                                        value="desc"
                                        id="desc"
                                        {...register("price")}
                                    />
                                    <label htmlFor="desc" className="pl-2">
                                        High to Low
                                    </label>
                                </div>
                            </div>

                            <button className="btn bg-gray-500 text-white mt-5" type="submit">
                                Apply Filters
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AllBooks;
