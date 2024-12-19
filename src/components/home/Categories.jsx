import Category from "../shared/Category";
import Title from "../shared/Title";

const Categories = () => {
    return (
        <div>
            <Title name="Buy from a writer" />
            <h2>Categories b writer</h2>
            <div className="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-2">
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
                <Category />
            </div>
        </div>
    );
};

export default Categories;