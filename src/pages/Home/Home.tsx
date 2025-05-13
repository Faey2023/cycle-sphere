import Banner from '@/components/Home/Banner';
import Featured from '@/components/Home/Featured';
import Offer from '@/components/Home/Offer';
import OurHistory from '@/components/Home/OurHistory';
import Testimonial from '@/components/Home/Testimonial/Testimonial';
import WhyRideWithUs from '@/components/Home/WhyRideWithUs';

const Home = () => {
  return (
    <div className="mx-10 my-10 space-y-10">
      <Banner />
      <Featured />
      <Testimonial />
      <Offer />
      <OurHistory />
      <WhyRideWithUs />
    </div>
  );
};

export default Home;
