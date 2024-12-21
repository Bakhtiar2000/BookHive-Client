import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const usePublishers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: publishersData = [], isLoading: publishersLoading, refetch: publishersRefetch } = useQuery({
        queryKey: ['PublishersData'],
        queryFn: async () => {
            const res = await axiosSecure.get("publishers");
            return res.data;
        },
    });
    return [publishersData, publishersLoading, publishersRefetch];
};

export default usePublishers;