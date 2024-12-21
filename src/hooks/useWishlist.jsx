import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useWishlists = () => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext)
    const { data: wishlistsData = [], isLoading: wishlistsLoading, refetch: wishlistsRefetch } = useQuery({
        queryKey: ['WishlistsData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`wishlists/${currentUser?.email}`);
            return res.data;
        },
    });
    return [wishlistsData, wishlistsLoading, wishlistsRefetch];
};

export default useWishlists;