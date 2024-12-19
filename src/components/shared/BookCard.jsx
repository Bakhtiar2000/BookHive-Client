const BookCard = ({ book }) => {
    const { id, title, author, genre, publishedYear, isbn, price, rating, availableCopies, coverImageUrl, description, language, pageCount, publisher } = book
    return (
        <div className="card bg-base-100  shadow-xl">
            <figure>
                <img
                    src={coverImageUrl}
                    alt={title}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default BookCard;
