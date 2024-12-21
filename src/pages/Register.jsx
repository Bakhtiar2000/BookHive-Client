import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxios';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const { signUp, profileUpdate, setLoading, logOut, googleSignIn } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        if (data.password.length < 8) {
            return toast.warning("Password should have at least 8 characters", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
        }

        if (!/[A-Z]/.test(data.password)) {
            return toast.warning("Password should include at least one uppercase letter", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
        }

        if (!/[a-z]/.test(data.password)) {
            return toast.warning("Password should include at least one lowercase letter", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
        }

        if (!/[0-9]/.test(data.password)) {
            return toast.warning("Password should include at least one number", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
        }

        if (!/[@!#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?]/.test(data.password)) {
            return toast.warning("Password should include at least one special character (e.g., @, !, #, etc.)", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
        }

        if (data.password !== data.confirm) {
            return toast.warning("Passwords didn't match", {
                position: "top-right",
                autoClose: 4000,
                theme: "light",
            });
        }

        const userData = {
            name: data.name,
            email: data.email,
            img: data?.img,
            role: data.role,
        }
        signUp(data.email, data.password)
            .then((result) => {
                profileUpdate(result.user, data.name)
                    .then(() => {
                        axiosSecure.post('/users', userData)
                            .then(res => {
                                if (res.status === 200) {
                                    logOut()
                                        .then()
                                        .catch()
                                    navigate('/login');
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            });
                    })
                    .catch((error) => {
                        setLoading(false)
                        toast.error(error.message, {
                            position: "top-right",
                            autoClose: 4000,
                            theme: "light",
                        });
                    });
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const handleLogInWithGoogle = () => {
        googleSignIn()
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser)
                const savedUser = { name: loggedUser?.displayName, email: loggedUser?.email, img: loggedUser?.photoURL, role: 'buyer' }
                console.log(savedUser)
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        navigate('/')
                        console.log(data.insertedId)
                        Swal.fire({
                            title: 'Account logged in successfully',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    })
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-center">

                <div className='mx-auto bg-slate-50 px-40 py-20 mt-20 rounded-xl shadow-2xl'>
                    <div className="max-w-sm mx-auto">
                        <h2 className="text-4xl font-semibold my-10">Sign up to <span className="text-primary">BookHive</span></h2>

                        {/* Google Button */}
                        <div onClick={handleLogInWithGoogle} className="h-12 w-1/2 flex justify-center items-center gap-3 mx-auto outline-none rounded-lg px-3 cursor-pointer bg-red-500 duration-300 text-white mt-5"
                        >
                            <FaGoogle className="text-2xl" />
                            <p>Google</p>
                        </div>

                        <p className="my-5 text-xl text-center font-semibold">OR</p>

                        <form onSubmit={handleSubmit(onSubmit)} >
                            {/* Full Name */}
                            <input
                                className="h-12 w-full border outline-none focus:border-b-4 focus:border-primary  px-3 text-dark bg-white"
                                type="text"
                                placeholder="*Full Name: "
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className='text-sm text-red-500 ml-1'>Name is required</span>}

                            {/* Image Link */}
                            <input
                                className="h-12 w-full border outline-none focus:border-b-4 focus:border-primary  px-3 text-dark bg-white"
                                type="text"
                                placeholder="Image Link: "
                                {...register("img")}
                            />

                            {/* Email */}
                            <input
                                className="h-12 w-full border outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mt-5 bg-white"
                                type="email"
                                placeholder="*Email: "
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className='text-sm text-red-500 ml-1'>Email is required</span>}

                            {/* Password */}
                            <input
                                className="h-12 w-full border outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mt-5 bg-white"
                                type="password"
                                placeholder="*Password: "
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className='text-sm text-red-500 ml-1'>Password is required</span>}

                            {/* Confirm Password */}
                            <input
                                className="h-12 w-full border outline-none focus:border-b-4 focus:border-primary  px-3 text-dark mt-5 bg-white"
                                type="password"
                                placeholder="*Confirm Password: "
                                {...register("confirm", { required: true })}
                            />
                            {errors.confirm && <span className='text-sm text-red-500 ml-1'>Confirm Password is required</span>}

                            {/* user type" */}
                            <div className='mt-5'>
                                <span className='pr-5'>I am a: </span>
                                <input
                                    className='outline-none cursor-pointer'
                                    type="radio"
                                    name="role"
                                    id="buyer"
                                    value="buyer"
                                    {...register("role", { required: true })}
                                />
                                <label className='pl-2 pr-5' htmlFor="buyer">Buyer</label>

                                <input
                                    className='outline-none cursor-pointer'
                                    type="radio"
                                    name="role"
                                    id="seller"
                                    value="seller"
                                    {...register("role", { required: true })}
                                />
                                <label className='pl-2' htmlFor="seller">Seller</label>
                            </div>
                            {errors.role && <span className='text-sm text-red-500 ml-1'>User Role is required</span>}


                            {/* Submit */}
                            <input
                                className="h-12 w-full outline-none  px-3 font-bold cursor-pointer bg-primary text-white duration-300 mt-5"
                                type="submit"
                                value="Signup"
                            />

                            {/* Sign up */}
                            <p className='mt-2 text-end text-gray'>Already have an account? <Link className='text-primary' to='/login'>Sign in</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;