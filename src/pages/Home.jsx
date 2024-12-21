import FAQ from "../components/home/FAQ"
import Banner from "../components/home/Banner"
import FeaturedBooks from "../components/home/FeaturedBooks"
import Reviews from "../components/home/Reviews"
import Categories from "../components/home/Categories"
import ContactUs from "../components/home/ContactUs"


const Home = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Banner />
                <FeaturedBooks />
                <Categories />
                <Reviews />
                <ContactUs />
                <FAQ />
            </div>
        </div>
    )
}
export default Home
