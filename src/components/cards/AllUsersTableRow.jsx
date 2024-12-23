import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const AllUsersTableRow = ({ index, user, refetch }) => {
    const [axiosSecure] = useAxiosSecure();
    const { _id, img, email, name, role } = user;
    const [roleUpdate, setRoleUpdate] = useState(role);

    const roleChanges = (newRole) => {
        const roleData = { role: newRole };

        if (newRole && newRole !== role) {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/role/${_id}`, roleData)
                        .then((res) => {
                            if (res.status === 200) {
                                refetch();
                                Swal.fire({
                                    icon: "success",
                                    title: "Updated role successfully!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                setRoleUpdate(newRole);
                            }
                        })
                        .catch((err) => {
                            console.error(err);
                            toast.error("Failed to update role.");
                        });
                }
            });
        }
    };

    const removeUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${_id}`)
                    .then(res => {
                        if (res.status === 200) {
                            toast.success("Deleted user successfully!", {
                                position: "top-center",
                                autoClose: 3000,
                                theme: "light",
                            });
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error("Failed to delete user.");
                    });
            }
        });
    };

    return (
        <>
            <tr className="border-b border-teal-200 hover:bg-teal-50 duration-300 text-center">
                <td>{index + 1}</td>
                <td className='flex justify-center'>
                    {img ? (
                        <img
                            className="cursor-pointer w-8 md:w-10 h-8 md:h-10 rounded-full"
                            src={img}
                            alt="Profile"
                        />
                    ) : (
                        <p className="w-8 md:w-10 h-8 md:h-10 text-center text-lg font-semibold hover:bg-gray-300 md:py-1 hover:text-white rounded-full uppercase border cursor-pointer duration-300 border-teal-500 hover:border-gray-300 text-teal-500">
                            {name?.split(' ')
                                .filter(word => word.length > 2)
                                .slice(0, 2)
                                .map(word => word[0])
                                .join('')}
                        </p>
                    )}
                </td>
                <td>{email}</td>
                <td>{name}</td>
                <td>
                    <select
                        onChange={(e) => roleChanges(e.target.value)}
                        name="role"
                        id="role"
                        value={roleUpdate}
                        className="focus:outline-none cursor-pointer uppercase"
                    >
                        {["admin", "buyer", "seller"].filter(r => r !== role).map((role) => (
                            <option key={role} className="uppercase cursor-pointer" value={role}>
                                {role}
                            </option>
                        ))}
                        <option value={role} className="uppercase cursor-pointer">{role}</option>
                    </select>
                </td>
                <td>
                    <button
                        onClick={removeUser}
                        className="text-red-500"
                    >
                        <MdDelete className="text-2xl" />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default AllUsersTableRow;
