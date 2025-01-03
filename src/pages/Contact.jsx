import Title from "../components/shared/Title";
import emailjs from '@emailjs/browser';
import { useRef } from "react";
import Swal from 'sweetalert2';
const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_olrff0d', 'template_3c6ihea', form.current, 'EfJGi9kbbTr8J0JuP')
            .then((result) => {
                e.target.reset()
                Swal.fire(
                    'Message has been Sent!',
                    'Thanks for connecting with us!',
                    'success'
                )
            }, (error) => {
                console.log(error.text);
            });

    };
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
                <Title name="Contact Us" />
                <form ref={form} onSubmit={sendEmail}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="user_name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="user_email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            name="message"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your message"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
