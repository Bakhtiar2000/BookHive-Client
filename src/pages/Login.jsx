import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {

    const { signIn, setLoading, resetPassword, googleSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [type, setType] = useState('password');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // reset password
    const handlePassReset = () => {
        const email = watch('email');
        if (errors.email || email === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Write your email!',
                text: '',
                showConfirmButton: false,
                timer: 2500
            })
        }

        resetPassword(email)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Check your email!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "light",
                });
            })
    }

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                console.log(res.user);
                navigate(from, { replace: true })

                Swal.fire({
                    title: 'Account login successful',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
                error.message == "Firebase: Error (auth/user-not-found)." ?
                    toast.error("User Not Found", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                    }) :
                    error.message == "Firebase: Error (auth/invalid-email)." ?
                        toast.error("Invalid Mail Provided", {
                            position: "top-center",
                            autoClose: 3000,
                            theme: "light",
                        }) :
                        toast.error(error.message, {
                            position: "top-center",
                            autoClose: 3000,
                            theme: "light",
                        });
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
            <div className="w-full flex justify-center items-center h-screen lg:h-auto px-5">
                <div className="mx-auto bg-slate-50 px-40 py-20 mt-20 rounded-xl shadow-2xl">
                    <h2 className="text-4xl font-semibold mb-10">Login to <span className="text-primary">BookHive</span></h2>
                    {/* Google Button */}
                    <div onClick={handleLogInWithGoogle} className="h-12 w-1/2 flex justify-center items-center gap-3 mx-auto outline-none rounded-lg px-3 cursor-pointer bg-red-500 duration-300 text-white mt-5"
                    >
                        <FaGoogle className="text-2xl" />
                        <p>Google</p>
                    </div>

                    <p className="my-5 text-xl text-center font-semibold">OR</p>

                    <form onSubmit={handleSubmit(onSubmit)} >
                        {/* Email */}
                        <input
                            className="h-12 w-full border outline-none px-3 text-dark bg-white"
                            type="email"
                            placeholder="Email: "
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className='text-sm text-red-400 ml-1'>Email is required</span>}

                        {/* Password */}
                        <div className="h-12 w-full border bg-white px-3 flex justify-between items-center mt-5">
                            <input
                                className="flex-1 outline-none text-dark bg-white"
                                type={type}
                                placeholder="Password: "
                                {...register("password", { required: true })}
                            />

                            {/* Eye */}
                            <div className='cursor-pointer text-black text-xl' onClick={() => setType(type === 'password' ? 'text' : 'password')}>
                                {
                                    type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                }
                            </div>
                        </div>
                        {errors.password && <span className='text-sm text-red-400 ml-1'>Password is required</span>}

                        {/* Password reset */}
                        <div onClick={handlePassReset} className='text-right text-sm hover:text-blue-500 hover:underline block cursor-pointer duration-300 z-30 mt-1'>Forgot password?</div>

                        {/* Submit */}
                        <input
                            className="h-12 w-full outline-none  px-3 font-bold cursor-pointer bg-primary text-white  duration-300 mt-5"
                            type="submit"
                            value="Login"
                        />

                        {/* Sign up */}
                        <p className='mt-2 text-end text-gray'>New to BookHive? <Link className='text-primary' to='/register'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;