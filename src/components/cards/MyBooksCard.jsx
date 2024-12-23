import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxios';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { LiaEditSolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MyBooksCard = ({ book, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const updatedBook = {
            title: data?.title,
            author: data?.author,
            genre: data?.genre,
            publishedYear: parseInt(data?.publishedYear),
            isbn: data?.isbn,
            price: parseFloat(data?.price),
            rating: parseFloat(data?.rating),
            availableCopies: parseInt(data?.availableCopies),
            coverImageUrl: data?.coverImageUrl,
            description: data?.description,
            language: data?.language,
            pageCount: parseInt(data?.pageCount),
            publisher: data?.publisher,
            addedBy: currentUser?.email
        };

        axiosSecure.put(`/book/${book._id}`, updatedBook)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Book updated Successfully!',
                        'Check Your book in the inventory.',
                        'success'
                    );
                    reset();
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error', 'There was an error adding the book. Please try again.', 'error');
            });
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
            {/* Update dialog box */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost text-xl absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-xl pb-2 mb-5 border-b border-black text-center">Update Book</h3>
                    <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Title</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    defaultValue={book.title}
                                    className="input input-bordered w-full"
                                />
                                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Author</label>
                                <input
                                    type="text"
                                    defaultValue={book.author}
                                    {...register("author", { required: "Author is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.author && <p className="text-red-500">{errors.author.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Genre</label>
                                <input
                                    type="text"
                                    defaultValue={book.genre}
                                    {...register("genre", { required: "Genre is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Published Year</label>
                                <input
                                    type="number"
                                    defaultValue={book.publishedYear}
                                    {...register("publishedYear", { required: "Published year is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.publishedYear && <p className="text-red-500">{errors.publishedYear.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">ISBN</label>
                                <input
                                    type="text"
                                    defaultValue={book.isbn}
                                    {...register("isbn", { required: "ISBN is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Price</label>
                                <input
                                    type="number"
                                    defaultValue={book.price}
                                    step="0.01"
                                    {...register("price", { required: "Price is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Rating</label>
                                <input
                                    type="number"
                                    defaultValue={book.rating}
                                    step="0.1"
                                    {...register("rating", { required: "Rating is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Available Copies</label>
                                <input
                                    type="number"
                                    defaultValue={book.availableCopies}
                                    {...register("availableCopies", { required: "Available copies are required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.availableCopies && <p className="text-red-500">{errors.availableCopies.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Cover Image URL</label>
                                <input
                                    type="url"
                                    defaultValue={book.coverImageUrl}
                                    {...register("coverImageUrl", { required: "Cover image URL is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.coverImageUrl && <p className="text-red-500">{errors.coverImageUrl.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Language</label>
                                <input
                                    type="text"
                                    defaultValue={book.language}
                                    {...register("language", { required: "Language is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.language && <p className="text-red-500">{errors.language.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Page Count</label>
                                <input
                                    type="number"
                                    defaultValue={book.pageCount}
                                    {...register("pageCount", { required: "Page count is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.pageCount && <p className="text-red-500">{errors.pageCount.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Publisher</label>
                                <input
                                    type="text"
                                    defaultValue={book.publisher}
                                    {...register("publisher", { required: "Publisher is required" })}
                                    className="input input-bordered w-full"
                                />
                                {errors.publisher && <p className="text-red-500">{errors.publisher.message}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block mb-2 font-medium">Description</label>
                                <textarea
                                    defaultValue={book.description}
                                    {...register("description", { required: "Description is required" })}
                                    className="textarea textarea-bordered w-full"
                                    rows="4"
                                />
                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                            </div>
                        </div>
                        <button type="submit" className="btn bg-gray-500 text-white w-full mt-5">
                            Submit
                        </button>
                    </form>
                </div>
            </dialog>

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
                    onClick={() => document.getElementById('my_modal_3').showModal()}
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