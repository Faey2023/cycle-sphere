import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Wrench } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-6 w-6 text-red-600" />,
    title: 'Free Delivery',
    description: 'We deliver bikes across the country within 3–5 business days.',
  },
  {
    icon: <Wrench className="h-6 w-6 text-red-600" />,
    title: 'Lifetime Service',
    description: 'Enjoy free basic servicing for a lifetime at any of our service centers.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-red-600" />,
    title: '2-Year Warranty',
    description: 'Your bike is covered for parts and frame damage for 2 full years.',
  },
];

const WhyRideWithUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center shadow-md"
    >
      <h2 className="mb-6 text-xl font-bold text-red-700 md:text-2xl">Why Ride With Us?</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
            className={`cursor-pointer rounded-xl border bg-white p-5 transition hover:shadow-lg ${
              activeIndex === index ? 'border-red-500 shadow-md' : 'border-gray-200'
            }`}
          >
            <div className="mb-3 flex justify-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-sm text-gray-600"
              >
                {feature.description}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyRideWithUs;
