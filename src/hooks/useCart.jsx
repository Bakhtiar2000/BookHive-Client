import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCarts = () => {
    const [axiosSecure] = useAxiosSecure();
    const { currentUser } = useContext(AuthContext)
    const { data: cartsData = [], isLoading: cartsLoading, refetch: cartsRefetch } = useQuery({
        queryKey: ['CartsData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`carts/${currentUser?.email}`);
            return res.data;
        },
    });
    return [cartsData, cartsLoading, cartsRefetch];
};

export default useCarts;