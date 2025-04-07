import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="bg-white">
      <div className="grid max-w-screen-xl py-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl  ">
            Ride Into Adventure with the Perfect Cycle!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl  ">
            Discover top-quality bicycles designed for every ride—whether you're cruising through
            the city, conquering rugged trails, or chasing speed on the open road. Find the perfect
            match for your journey today!
          </p>
          <Link to="/allBicycles">
            <button className="inline-flex cursor-pointer items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300  ">
              Shop Now
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Link>
          <button className="inline-flex cursor-pointer items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100  ">
            Explore Collections
          </button>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/assets/cycle-banner.png" alt="man-on-a-cycle-image" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
