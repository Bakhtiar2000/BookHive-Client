import { useEffect, useState } from "react";
import Title from "../shared/Title";
import CategoryCard from "../shared/CategoryCard";
import useAuthors from "../../hooks/useReviews";
import usePublishers from "../../hooks/usePublishers";

const Categories = () => {

    const [authorsData, authorsLoading, authorsRefetch] = useAuthors()
    const [publishersData, publishersLoading, publishersRefetch] = usePublishers()
    if (authorsLoading) return <p>Loading...</p>
    if (publishersLoading) return <p>Loading...</p>

    return (
        <div className="my-2">
            <Title name="Select books by authors" />
            <div className="grid gap-2 lg:grid-cols-5 grid-cols-3 duration-300 px-2 place-items-center">
                {
                    authorsData.slice(0, 6).map(author => <CategoryCard key={author.id} category={author} />)
                }
            </div>
            <Title name="Select books by publishers" />
            <div className="grid gap-2 lg:grid-cols-5 grid-cols-3 duration-300 px-2 place-items-center">
                {
                    publishersData.slice(0, 6).map(author => <CategoryCard key={author.id} category={author} />)
                }
            </div>
        </div>
    );
};

export default Categories;