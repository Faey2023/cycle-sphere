import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './testimonial.css';

const Testimonial = () => {
  return (
    <div className="relative mx-auto max-w-5xl py-9">
      <h2 className="mb-4 text-center text-4xl italic">
        See what our satisfied customer has to say.
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={'auto'}
        spaceBetween={6}
        centeredSlides={true}
        loop={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <SwiperSlide
            key={i}
            className="swiper-slide my-5 w-auto max-w-[330px] flex-shrink-0 transition-transform duration-300"
          >
            <div className="relative mx-5 max-w-[330px] cursor-pointer rounded-2xl bg-white p-7 shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              <div className="flex w-full flex-col items-center text-center">
                <div className="stars text-2xl text-[#f1b00f]">
                  {i % 2 === 0 ? '★★★★★' : '★★★★☆'}
                </div>
                <p className="mt-6 mb-7 text-xs font-medium text-[#696b76] italic md:text-lg">
                  Cycle Sphere made my bike shopping experience effortless! The website is easy to
                  use, the selection is great, and delivery was fast. The bike quality is excellent,
                  and customer service was super helpful. Highly recommend!
                </p>
                <img className="size-20 rounded-full" src="/assets/user.jpeg" alt="avatar" />
                <h4 className="text-base font-bold text-gray-500 md:text-lg">John Smith</h4>
                <h6 className="text-[10px] font-medium text-gray-700 md:text-sm">Cycle Sphere</h6>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
};

export default Testimonial;
