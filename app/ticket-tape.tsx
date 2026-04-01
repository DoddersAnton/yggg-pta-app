// components/TicketTape.tsx
"use client"

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const messages = [
  '📅 Check out our upcoming PTA events',
  '🙋‍♀️ Volunteer opportunities available',
  '🏫 Help enrich our students’ school experience!',
  '📚 Learn how your money is improving the school equipment',
  '🍎 Thank you to our amazing teachers and parents!',
  '🎉 Check out the latest news!',
  '💡 Find Out about the next PTA Meeting - All are welcome!',
];

export default function TicketTape() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    } else {
      controls.stop();
    }
  }, [inView, controls]);

  return (
    <div ref={ref} className="overflow-hidden whitespace-nowrap bg-purple-900 py-2 border-t-2 border-b-2 border-black">
      <motion.div
        className="flex w-max"
        animate={controls}
        variants={{
          animate: {
            x: ['0%', '-50%'],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 36,
                ease: 'linear',
              },
            },
          },
        }}
      >
        <div className="flex shrink-0 space-x-12 px-4">
          {[...messages, ...messages].map((msg, i) => (
            <span key={`first-${i}`} className="text-sm font-black uppercase tracking-widest text-yellow-300">
              {msg}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 space-x-12 px-4" aria-hidden="true">
          {[...messages, ...messages].map((msg, i) => (
            <span key={`second-${i}`} className="text-sm font-black uppercase tracking-widest text-yellow-300">
              {msg}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
