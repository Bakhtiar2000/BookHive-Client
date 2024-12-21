import Title from "../components/shared/Title";


const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl p-6 bg-white shadow-md rounded-md">
                <Title name="About Us" />
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Welcome to <span className="font-bold">BookHive</span>, your trusted destination for books of all genres. Our mission is to connect readers with the books they love, fostering a vibrant community of book enthusiasts worldwide.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    At BookHive, we believe in the power of stories and knowledge. From timeless classics to the latest bestsellers, our curated collection ensures there’s something for every reader. We aim to make the process of discovering and purchasing books seamless, affordable, and enjoyable.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Our journey started with a passion for books and a vision to create a platform where readers and authors come together. Today, we’re proud to serve a community of readers who share our love for literature and learning.
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">Why Choose Us?</h3>
                <ul className="list-disc list-inside text-gray-700 text-lg">
                    <li>Wide range of books across multiple genres.</li>
                    <li>Easy-to-use platform with secure payment options.</li>
                    <li>Fast and reliable delivery to your doorstep.</li>
                    <li>Exclusive deals and discounts for avid readers.</li>
                    <li>Dedicated customer support to assist you anytime.</li>
                </ul>
                <p className="text-gray-700 text-lg leading-relaxed mt-6">
                    Join us on this literary adventure and let us help you find your next great read. Together, we can make every page turn into a memorable journey.
                </p>
            </div>
        </div>
    );
};

export default About;
