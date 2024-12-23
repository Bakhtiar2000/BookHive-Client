import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import ActiveLink from '../../utils/ActiveLink';

const NavItems = () => {
    const { currentUser } = useContext(AuthContext)
    // console.log(currentUser);

    return (
        <>
            {
                currentUser.role === "buyer" ?
                    <>
                        <li><ActiveLink to="/">Home</ActiveLink></li>
                        <li><ActiveLink to="/books">Books</ActiveLink></li>
                        <li><ActiveLink to="/wishlist">My Wishlist</ActiveLink></li>
                        <li><ActiveLink to="/cart">Cart</ActiveLink></li>
                        <li><ActiveLink to="/about">About</ActiveLink></li>
                        <li><ActiveLink to="/contact">Contact</ActiveLink></li>
                    </> :
                    currentUser.role === "seller" ?
                        <>
                            <li><ActiveLink to="/">Home</ActiveLink></li>
                            <li><ActiveLink to="/books">Books</ActiveLink></li>
                            <li><ActiveLink to="/addABook">Add a Book</ActiveLink></li>
                            <li><ActiveLink to="/myBooks">My Books</ActiveLink></li>
                            <li><ActiveLink to="/about">About</ActiveLink></li>
                            <li><ActiveLink to="/contact">Contact</ActiveLink></li>
                        </> :
                        currentUser.role === "admin" ?
                            <>
                                <li><ActiveLink to="/">Home</ActiveLink></li>
                                <li><ActiveLink to="/books">Books</ActiveLink></li>
                                <li><ActiveLink to="/allUsers">All Users</ActiveLink></li>
                                <li><ActiveLink to="/about">About</ActiveLink></li>
                                <li><ActiveLink to="/contact">Contact</ActiveLink></li>
                            </> :

                            <>
                                <li><ActiveLink to="/">Home</ActiveLink></li>
                                <li><ActiveLink to="/books">Books</ActiveLink></li>
                                <li><ActiveLink to="/about">About</ActiveLink></li>
                                <li><ActiveLink to="/contact">Contact</ActiveLink></li>

                            </>

            }
        </>
    );
};

export default NavItems;