import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleBook = () => {
    const bookData = useLoaderData()
    console.log(bookData)
    return (
        <div>
            <h2>Single book</h2>
        </div>
    );
};

export default SingleBook;