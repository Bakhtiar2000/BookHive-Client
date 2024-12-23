import React from 'react';
import useMyBooks from '../hooks/useMyBooks';
import MyBooksCard from '../components/shared/MyBooksCard';
import Title from '../components/shared/Title';

const MyBooks = () => {
    const [myBooksData, myBooksLoading, myBooksRefetch] = useMyBooks()
    if (myBooksLoading) return <p>Loading...</p>
    return (
        <div className='container mx-auto'>
            <Title name="My Books" />
            {
                myBooksData.map((book) => <MyBooksCard key={book._id} book={book} refetch={myBooksRefetch} />)
            }
        </div>
    );
};

export default MyBooks;