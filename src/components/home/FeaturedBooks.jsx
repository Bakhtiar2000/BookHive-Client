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

  console.log(books)
  return (
    <div className="my-2">
      <Title name="Featured Books" />
      <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-2">
        {
          books.map(book => <BookCard key={book.id} book={book} />)
        }
      </div>
    </div>
  );
}

export default FeaturedBooks;