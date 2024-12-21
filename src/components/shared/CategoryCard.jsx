import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    const { _id, img, name } = category
    return (
        <Link to={`/books`} className="flex flex-col justify-center cursor-pointer items-center">
            <img className="rounded-full w-20 h-20" src={img} alt="" />
            <p>{name}</p>
        </Link>
    );
};

export default CategoryCard;