import axios from 'axios';

const axiosSecure = axios.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://book-hive-server-55dh4ekky-bakhtiar2000s-projects.vercel.app/',
});

const useAxiosSecure = () => {
    return [axiosSecure];
};

export default useAxiosSecure;