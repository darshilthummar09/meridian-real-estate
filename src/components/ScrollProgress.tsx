import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#A38259] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      {percentage > 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 bg-[#141413]/90 backdrop-blur-md px-3 py-1.5 border border-[#262624] text-[11px] font-sans tracking-widest text-[#9B978F] uppercase shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-[0_0_6px_#C5A059]" />
          <span>{percentage}% Scrolled</span>
        </motion.div>
      )}
    </>
  );
}
