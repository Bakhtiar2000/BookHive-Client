import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useReviews = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: reviewsData = [], isLoading: reviewsLoading, refetch: reviewsRefetch } = useQuery({
        queryKey: ['ReviewsData'],
        queryFn: async () => {
            const res = await axiosSecure.get("reviews");
            return res.data;
        },
    });
    return [reviewsData, reviewsLoading, reviewsRefetch];
};

export default useReviews;