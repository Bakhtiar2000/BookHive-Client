import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useCarts from '../hooks/useCart';
import useAxiosSecure from '../hooks/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SingleBook = () => {
    const { author,
        availableCopies,
        description,
        coverImageUrl,
        genre,
        isbn,
        language,
        pageCount,
        price,
        publishedYear,
        publisher,
        rating,
        title,
        _id } = useLoaderData()

    const [cartsData, cartsLoading, cartsRefetch] = useCarts();
    const [cartStatus, setCartStatus] = useState(false);
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (cartsData?.list) {
            setCartStatus(cartsData?.list?.includes(_id));
        }
    }, [cartsData, _id]);

    const onAddToCart = () => {
        axiosSecure.post(`/cart/${currentUser?.email}`, { item: _id })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Added To Cart", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    });
                    cartsRefetch();
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div className='container mx-auto mt-10'>

            {/* Upper Content */}
            <div className='flex justify-center gap-10 mb-10'>
                {/* Upper Left */}
                <div className='border-2 border-teal-500 p-5'>
                    <img src={coverImageUrl} alt="" />
                </div>

                {/* Upper Right */}
                <div className='my-auto'>
                    <p className='text-3xl font-semibold'>{title}</p>
                    <p className='text-lg mt-2 mb-1'>by <span className='text-blue-500 cursor-pointer hover:underline text-xl font-semibold'>{author}</span></p>
                    <p className='mb-5'>Genre: {genre}</p>
                    <p>Publisher: {publisher}</p>
                    <p className='mt-2'>Rating: {rating} / 5</p>
                    <p className="text-lg mt-2">
                        <span className="line-through mr-3 text-red-600">${(Number(price)) * 3}</span>
                        <span className="text-green-500 font-semibold">${price}</span>
                    </p>
                    {
                        !cartStatus ?
                            <div onClick={onAddToCart} className="w-full btn bg-teal-500 mt-10">
                                <button className="text-white">Add to cart</button>
                            </div> :
                            <div className="w-full btn btn-disabled border flex items-center justify-center mt-10">
                                <p>Added to cart</p>
                                <FaCartPlus className="text-lg" />
                            </div>
                    }

                </div>
            </div>

            {/* Lower Content - Tabs*/}
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Description" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <p>{description}</p>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Specification"
                    defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <table className="table-auto border-collapse border border-gray-200 w-full text-left">
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700">Title</td>
                                <td className="border border-gray-300 px-4 py-2">{title}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700">Author</td>
                                <td className="border border-gray-300 px-4 py-2">{author}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700 w-40">Publisher</td>
                                <td className="border border-gray-300 px-4 py-2">{publisher}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700">Edition</td>
                                <td className="border border-gray-300 px-4 py-2">{publishedYear}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700">Number of Pages</td>
                                <td className="border border-gray-300 px-4 py-2">{pageCount}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700">Available Copies</td>
                                <td className="border border-gray-300 px-4 py-2">{availableCopies}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2  bg-gray-100 text-gray-700">Language</td>
                                <td className="border border-gray-300 px-4 py-2">{language}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Author" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    {author}
                </div>
            </div>
        </div>
    );
};

export default SingleBook;