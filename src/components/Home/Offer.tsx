import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Set the target date here
  const offerEndsAt = new Date('2025-05-20T23:59:59').getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerEndsAt - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d : ${hours}h : ${minutes}m : ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [offerEndsAt]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-md"
    >
      <div className="mb-4 flex items-center justify-center gap-2 text-red-600">
        <Flame className="h-6 w-6" />
        <h2 className="text-xl font-bold md:text-2xl">Limited-Time Offer!</h2>
      </div>

      <p className="mb-3 text-lg text-gray-700">
        🚴‍♂️ Get <span className="font-semibold text-red-600">15% OFF</span> on all mountain bikes!
      </p>

      <p className="mb-2 text-sm text-gray-500">
        Offer ends on <strong>May 20, 2025</strong>
      </p>

      {/* Real Countdown Timer */}
      <div className="mb-4 font-mono text-lg text-red-500">{timeLeft}</div>

      <button className="rounded-lg bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600">
        Shop Now
      </button>
    </motion.section>
  );
};

export default Offer;
