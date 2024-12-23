import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const NavItems = () => {
    const { currentUser } = useContext(AuthContext)
    // console.log(currentUser);

    return (
        <>
            {
                currentUser.role === "buyer" ?
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/books">Books</Link></li>
                        <li><Link to="/wishlist">My Wishlist</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </> :
                    currentUser.role === "seller" ?
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/books">Books</Link></li>
                            <li><Link to="/about">Add a Book</Link></li>
                            <li><Link to="/about">My Books</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </> :
                        currentUser.role === "admin" ?
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/books">Books</Link></li>
                                <li><Link to="/books">All Users</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </> :

                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/books">Books</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>

                            </>

            }
        </>
    );
};

export default NavItems;