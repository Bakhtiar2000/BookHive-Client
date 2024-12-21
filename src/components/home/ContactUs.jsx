import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail, MdOutlineLocationOn } from 'react-icons/md';
import Title from '../shared/Title';

const ContactUs = () => {
    return (
        <div className="bg-gray-100">
            <Title name="Contact Us" />
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-10">
                {/* About Club */}
                <div className="flex flex-col items-center">
                    <div className="bg-teal-500 p-4 rounded-full mb-4">
                        <MdEmail className='text-2xl text-teal-100' />
                    </div>
                    <h3 className="text-lg font-bold mb-2">OUR MAIL</h3>
                    <p className="text-gray-600">info@bookhive.com</p>
                </div>

                {/* Phone Section */}
                <div className="flex flex-col items-center">
                    <div className="bg-teal-500 p-4 rounded-full mb-4">
                        <FaPhoneAlt className='text-2xl text-teal-100' />
                    </div>
                    <h3 className="text-lg font-bold mb-2">PHONE (LANDLINE)</h3>
                    <p className="text-gray-600">+912 3 567 898</p>
                    <p className="text-gray-600">+912 5 252 3336</p>
                </div>

                {/* Office Location */}
                <div className="flex flex-col items-center">
                    <div className="bg-teal-500 p-4 rounded-full mb-4">
                        <MdOutlineLocationOn className='text-2xl text-teal-100' />
                    </div>
                    <h3 className="text-lg font-bold mb-2">OUR OFFICE LOCATION</h3>
                    <p className="text-gray-600">
                        The Interior Design Studio Company
                    </p>
                    <p className="text-gray-600">
                        The Courtyard, Al Quoz 1, Colorado, USA
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;