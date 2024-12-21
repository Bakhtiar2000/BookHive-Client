import { useState } from "react";
import BookCard from "../shared/BookCard";
import Title from "../shared/Title";
import { useEffect } from "react";
import useBooks from "../../hooks/useBooks";

const FeaturedBooks = () => {
  const [booksData, booksLoading, booksRefetch] = useBooks()
  if (booksLoading) return <p>Loading...</p>

  return (
    <div className="mt-8 mb-5">
      <Title name="Featured Books" />
      <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 duration-300 px-2 mx-auto">
        {
          booksData.slice(0, 6).map(book => <BookCard key={book._id} book={book} />)
        }
      </div>
    </div>
  );
}

export default FeaturedBooks;