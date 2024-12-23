import { Link } from "react-router-dom";

const CategoryCard = ({ category, type }) => {
    const { _id, img, name } = category
    return (
        <Link to={type == "author" ? `/books?author=${name}` : `/books?publisher=${name}`} className="flex flex-col justify-center cursor-pointer items-center">
            <img className="rounded-full w-20 h-20 object-cover" src={img} alt="" />
            <p>{name}</p>
        </Link>
    );
};

export default CategoryCard;