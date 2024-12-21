import Title from "../shared/Title";

const FAQ = () => {
    return (
        <div className="my-3 px-2 w-1/2 mx-auto">
            <Title name="frequently asked Question" />
            <div className=" flex flex-col gap-1">
                <div className="collapse collapse-arrow bg-base-300">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        How can I purchase books from your website?
                    </div>
                    <div className="collapse-content">
                        <p>You can browse books by categories, authors, or publishers. Add your selected books to the cart, proceed to checkout, and complete your purchase using a preferred payment method.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Do I need an account to buy books?
                    </div>
                    <div className="collapse-content">
                        <p>No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and receive personalized recommendations.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Are the prices on the website inclusive of taxes?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, all prices displayed include applicable taxes unless specified otherwise.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        Do you offer gift cards?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, we offer gift cards that can be purchased online and used for any purchase on our website.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">
                        How long does it take for my order to arrive?
                    </div>
                    <div className="collapse-content">
                        <p>Delivery times vary based on your location and the shipping method chosen during checkout. Typically, orders are delivered within 3-7 business days.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;