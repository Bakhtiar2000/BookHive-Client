import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useBooks = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: booksData = [], isLoading: booksLoading, refetch: booksRefetch } = useQuery({
        queryKey: ['BooksData'],
        queryFn: async () => {
            const res = await axiosSecure.get("books");
            return res.data;
        },
    });
    return [booksData, booksLoading, booksRefetch];
};

export default useBooks;