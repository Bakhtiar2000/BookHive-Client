const CategoryCard = ({ category }) => {
    const { id, img, name } = category
    return (
        <div className="flex flex-col justify-center items-center">
            <img className="rounded-full w-20 h-20" src={img} alt="" />
            <p>{name}</p>
        </div>
    );
};

export default CategoryCard;