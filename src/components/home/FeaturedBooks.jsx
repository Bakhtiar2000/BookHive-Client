import { useState } from "react";
import BookCard from "../shared/BookCard";
import Title from "../shared/Title";
import { useEffect } from "react";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [])

  return (
    <div className="my-2">
      <Title name="Featured Books" />
      <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 duration-300 px-2 mx-auto">
        {
          books.slice(0, 6).map(book => <BookCard key={book.id} book={book} />)
        }
      </div>
    </div>
  );
}

export default FeaturedBooks;