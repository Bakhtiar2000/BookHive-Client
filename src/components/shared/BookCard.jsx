import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    const { id, title, author, genre, publishedYear, isbn, price, rating, availableCopies, coverImageUrl, description, language, pageCount, publisher } = book
    return (
        <div className="relative card bg-base-100 shadow-lg">
            <CiHeart className="absolute top-2 right-5 hover:right-3 cursor-pointer  text-4xl text-teal-500 hover:text-5xl hover:text-red-600 duration-200" />
            <img className="w-1/2 h-1/2 mx-auto"
                src={coverImageUrl}
                alt={title}
            />

            <div className="card-body px-5 p-3">
                <Link to={`/books/${id}`} className="card-title text-teal-500 cursor-pointer hover:underline duration-300">{title}</Link>
                <p>By {author}</p>
                <p>Rating: {rating} / 5</p>
                <p className="text-lg ">
                    <span className="line-through mr-3 text-red-600">${(Number(price)) * 3}</span>
                    <span className="text-green-500 font-semibold">${price}</span>
                </p>
                <div className="w-full btn bg-teal-500">
                    <button className="text-white">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
