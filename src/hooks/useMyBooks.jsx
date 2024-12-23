import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useMyBooks = () => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext)
    const { data: myBooksData = [], isLoading: myBooksLoading, refetch: myBooksRefetch } = useQuery({
        queryKey: ['MyBooksData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`books/email/${currentUser?.email}`);
            return res.data;
        },
    });
    return [myBooksData, myBooksLoading, myBooksRefetch];
};

export default useMyBooks;