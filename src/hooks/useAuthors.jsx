import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useAuthors = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: authorsData = [], isLoading: authorsLoading, refetch: authorsRefetch } = useQuery({
        queryKey: ['AuthorsData'],
        queryFn: async () => {
            const res = await axiosSecure.get("authors");
            return res.data;
        },
    });
    return [authorsData, authorsLoading, authorsRefetch];
};

export default useAuthors;