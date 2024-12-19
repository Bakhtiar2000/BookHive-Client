import BookCard from "../shared/BookCard";
import Title from "../shared/Title";

const FeaturedBooks = () => {
  return (
    <div className="my-2">
      <Title name="Featured Books" />
      <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-2">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
}

export default FeaturedBooks;