import React from 'react';
import Title from '../components/shared/Title';
import useUsers from '../hooks/useAllUsers';
import AllUsersTableRow from '../components/cards/allUsersTableRow';

const AllUsers = () => {
    const [usersData, usersLoading, usersRefetch] = useUsers()
    if (usersLoading) return <p>Loading...</p>
    return (
        <div className='container mx-auto'>
            <Title name="All Users" />
            <div className='max-w-5xl mx-auto py-10'>
                <div className="w-full mx-auto overflow-x-auto duration-300 rounded-md">
                    {
                        usersData.length > 0 ?
                            <table className="table lg:w-full">
                                <thead className="text-lg text-gray-950 border-b border-gray-700">
                                    <tr>
                                        <th className="px-3 py-3 font-medium text-center">SL</th>
                                        <th className="px-3 py-3 font-medium text-center">Image</th>
                                        <th className="px-3 py-3 font-medium text-center">Mail</th>
                                        <th className="px-3 py-3 font-medium text-center">Name</th>
                                        <th className="px-3 py-3 font-medium text-center">Role</th>
                                        <th className="px-3 py-3 font-medium text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usersData.map((user, index) => (
                                            <AllUsersTableRow
                                                index={index}
                                                key={user._id}
                                                user={user}
                                                refetch={usersRefetch}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table> :
                            <p className="py-4 text-lg text-center">☹ No data available!</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default AllUsers;