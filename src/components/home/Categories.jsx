import { useEffect, useState } from "react";
import Title from "../shared/Title";
import CategoryCard from "../shared/CategoryCard";

const Categories = () => {
    const [authors, setAuthors] = useState([])
    const [publishers, setPublishers] = useState([])

    useEffect(() => {
        fetch('/authors.json')
            .then(res => res.json())
            .then(data => setAuthors(data))
    }, [])

    useEffect(() => {
        fetch('/publishers.json')
            .then(res => res.json())
            .then(data => setPublishers(data))
    }, [])

    return (
        <div className="my-2">
            <Title name="Select books by authors" />
            <div className="grid gap-2 lg:grid-cols-5 grid-cols-3 duration-300 px-2 place-items-center">
                {
                    authors.slice(0, 6).map(author => <CategoryCard key={author.id} category={author} />)
                }
            </div>
            <Title name="Select books by publishers" />
            <div className="grid gap-2 lg:grid-cols-5 grid-cols-3 duration-300 px-2 place-items-center">
                {
                    publishers.slice(0, 6).map(author => <CategoryCard key={author.id} category={author} />)
                }
            </div>
        </div>
    );
};

export default Categories;