const BookCard = ({ book }) => {
    const { id, title, author, genre, publishedYear, isbn, price, rating, availableCopies, coverImageUrl, description, language, pageCount, publisher } = book
    return (
        <div className="card bg-base-100 shadow-lg">
            <img className="w-1/2 h-1/2 mx-auto"
                src={coverImageUrl}
                alt={title}
            />

            <div className="card-body px-5 p-3">
                <h2 className="card-title">{title}</h2>
                <p>By {author}</p>
                <p>Rating: {rating} / 5</p>
                <p className="text-lg ">
                    <span className="line-through mr-3 text-red-600">${(Number(price)) * 3}</span>
                    <span className="text-green-500 font-semibold">${price}</span>
                </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
