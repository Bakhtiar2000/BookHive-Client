import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxios';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { LiaEditSolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';

const MyBooksCard = ({ book, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const updateBook = () => {
        axiosSecure.put(`/books/${currentUser?.email}`, { item: book._id })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Updated Book Information", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    });
                    refetch();
                }
            })
            .catch(error => console.log(error));
    };
    const removeBook = () => {
        axiosSecure.delete(`/books`, { item: book._id })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Deleted Book Successfully", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    });
                    refetch();
                }
            })
            .catch(error => console.log(error));
    };
    return (
        <div className="flex gap-5 justify-between border p-5 rounded-lg shadow-md mb-4 max-w-4xl mx-auto">
            {/* Image + Specification */}
            <div className="flex items-center gap-5">
                {/* Image */}
                <img
                    className="w-40 h-min"
                    src={book.coverImageUrl}
                    alt={book.title}
                />
                {/* Specification */}
                <div>
                    <p className="text-3xl font-semibold">{book.title}</p>
                    <p className="text-lg mt-2 mb-1">
                        by{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline text-xl font-semibold">
                            {book.author}
                        </span>
                    </p>
                    <p className="mb-5">Genre: {book.genre}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p className="mt-2">Rating: {book.rating} / 5</p>
                    <p className="text-lg mt-2">
                        <span className="line-through mr-3 text-red-600">
                            ${Number(book.price) * 3}
                        </span>
                        <span className="text-green-500 font-semibold">
                            ${book.price}
                        </span>
                    </p>
                </div>
            </div>
            {/* Button */}
            <div className='flex items-center gap-3'>
                <button
                    onClick={() => updateBook(book._id)}
                    className="text-green-500"
                >
                    <LiaEditSolid className='text-2xl' />
                </button>
                <button
                    onClick={() => removeBook(book._id)}
                    className="text-red-500"
                >
                    <MdDelete className='text-2xl' />
                </button>
            </div>
        </div>
    );
};

export default MyBooksCard;