import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeline = [
  {
    year: '2010',
    title: 'Our Journey Begins',
    text: 'We opened our first small cycle repair shop with a dream to build a cycling community.',
    image: '/history-1.jpg',
  },
  {
    year: '2015',
    title: 'First 1,000 Customers',
    text: 'By 2015, we had sold over 1,000 bikes and expanded to a larger store.',
    image: '/history-2.jpg',
  },
  {
    year: '2020',
    title: 'Online Store Launch',
    text: 'We went online to reach riders across the country and introduced free delivery.',
    image: '/history-3.jpg',
  },
  {
    year: '2024',
    title: 'Sustainability Push',
    text: 'Introduced eco-friendly bikes and committed to carbon-neutral deliveries.',
    image: '/history-4.jpg',
  },
];

const OurHistory: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = timeline[activeIndex];

  return (
    <motion.section
      className="rounded-2xl border border-gray-100 bg-gray-50 p-8 shadow-md"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:text-3xl">Our History</h2>

      <div className="flex flex-col items-center gap-8 md:flex-row">
        {/* Image */}
        <div className="relative h-64 w-full md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.year}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="h-full w-full rounded-xl object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <p className="mb-1 text-sm font-medium text-red-500">{activeItem.year}</p>
          <h3 className="text-xl font-semibold text-gray-800">{activeItem.title}</h3>
          <p className="mt-2 text-gray-600">{activeItem.text}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {timeline.map((item, index) => (
              <button
                key={item.year}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition ${
                  index === activeIndex
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-red-400'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OurHistory;
