

const Banner = () => {
    return (
        <div
            className="hero min-h-[516px]"
            style={{
                backgroundImage: "url(https://img.freepik.com/free-vector/bookstore-aisle-interior-with-shelf-illustration_107791-20499.jpg?t=st=1734579975~exp=1734583575~hmac=7ce3d2006c4eddd06f83444c101c25e1eecc102ec53daa374e60aa2f3e21ce1e&w=1380)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to BookHive</h1>
                    <p className="mb-5">
                        Your ultimate destination for books that ignite your imagination, broaden your horizons, and bring stories to life. Dive into a world of endless possibilities today!
                    </p>
                    {/* <button className="btn btn-primary">Get Started</button> */}
                </div>
            </div>
        </div>
    );
};

export default Banner;