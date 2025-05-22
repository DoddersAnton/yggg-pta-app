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
  '🍎 Thank you to our samazing teachers and parents!',
  '🎉 Check out the latest news!',
  '💡 Find Out about the next PTA Meeting - sAll are welcome!',
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
    <div ref={ref} className="overflow-hidden whitespace-nowrap bg-yellow-100 py-2 border-t border-b border-yellow-400">
      <motion.div
        className="inline-block"
        animate={controls}
        variants={{
          animate: {
            x: ['0%', '-100%'],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            },
          },
        }}
      >
        <div className="flex space-x-12 px-4">
          {[...messages, ...messages].map((msg, i) => (
            <span key={i} className="text-sm font-semibold uppercase tracking-wide text-yellow-800">
              {msg}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
