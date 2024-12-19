import ReviewCard from "../shared/ReviewCard";
import Title from "../shared/Title";


const Reviews = () => {
    return (
        <div className="my-5">
            <Title name="customers review" />
            <div className="flex lg:flex-nowrap flex-wrap justify-center items-center gap-1 px-2">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    );
}

export default Reviews;