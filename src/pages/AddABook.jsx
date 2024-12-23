import React, { useContext } from 'react';
import Title from "../components/shared/Title";
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxios';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';

const AddABook = () => {
    const { currentUser } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const newBook = {
            title: data.title,
            author: data.author,
            genre: data.genre,
            publishedYear: parseInt(data.publishedYear),
            isbn: data.isbn,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            availableCopies: parseInt(data.availableCopies),
            coverImageUrl: data.coverImageUrl,
            description: data.description,
            language: data.language,
            pageCount: parseInt(data.pageCount),
            publisher: data.publisher,
            addedBy: currentUser?.email
        };

        axiosSecure.post('/books', newBook)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Book Added Successfully!',
                        'Your book is now available in the inventory.',
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

    return (
        <div className="container mx-auto py-8">
            <Title name="Add A Book" />
            <form className="max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Author</label>
                        <input
                            type="text"
                            {...register("author", { required: "Author is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.author && <p className="text-red-500">{errors.author.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Genre</label>
                        <input
                            type="text"
                            {...register("genre", { required: "Genre is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Published Year</label>
                        <input
                            type="number"
                            {...register("publishedYear", { required: "Published year is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.publishedYear && <p className="text-red-500">{errors.publishedYear.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">ISBN</label>
                        <input
                            type="text"
                            {...register("isbn", { required: "ISBN is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Price</label>
                        <input
                            type="number"
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
                            {...register("availableCopies", { required: "Available copies are required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.availableCopies && <p className="text-red-500">{errors.availableCopies.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Cover Image URL</label>
                        <input
                            type="url"
                            {...register("coverImageUrl", { required: "Cover image URL is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.coverImageUrl && <p className="text-red-500">{errors.coverImageUrl.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Language</label>
                        <input
                            type="text"
                            {...register("language", { required: "Language is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.language && <p className="text-red-500">{errors.language.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Page Count</label>
                        <input
                            type="number"
                            {...register("pageCount", { required: "Page count is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.pageCount && <p className="text-red-500">{errors.pageCount.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Publisher</label>
                        <input
                            type="text"
                            {...register("publisher", { required: "Publisher is required" })}
                            className="input input-bordered w-full"
                        />
                        {errors.publisher && <p className="text-red-500">{errors.publisher.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block mb-2 font-medium">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            className="textarea textarea-bordered w-full"
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-full">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddABook;
